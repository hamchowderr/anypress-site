// Server-only: signing customers in through the shop and calling its account API.
//
// The shop (WaaS Host) is the sign-in provider: OAuth 2.0 authorization code with PKCE. Tokens stay on this server,
// in an encrypted httpOnly cookie, and never reach the browser. API docs:
// https://github.com/hamchowderr/waas-plugins/blob/main/docs/account-api.md
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { SHOP_URL } from "@/lib/site";

const CLIENT_ID = process.env.ACCOUNT_CLIENT_ID || "";
const CLIENT_SECRET = process.env.ACCOUNT_CLIENT_SECRET || "";
const SESSION_SECRET = process.env.SESSION_SECRET || "";
const SITE_URL = (process.env.SITE_URL || "https://anypress.io").replace(/\/$/, "");

export const REDIRECT_URI = `${SITE_URL}/api/auth/callback`;
export const SESSION_COOKIE = "__Host-anypress_session";
export const SIGN_IN_COOKIE = "__Host-anypress_sign_in";
const API = `${SHOP_URL}/wp-json/waas-host/v1/account`;

/** Sessions last as long as the shop lets the refresh token live (at most 90 days). */
export const SESSION_MAX_AGE = 90 * 24 * 60 * 60;

/** Off until this site is registered on the shop; then "Sign in" goes to the shop's own account page. */
export function accountSignInEnabled(): boolean {
  return CLIENT_ID !== "" && CLIENT_SECRET !== "" && SESSION_SECRET.length >= 32;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  /** Unix seconds. */
  accessExpires: number;
}

/** What the sign-in redirect keeps until the customer comes back. */
export interface SignIn {
  state: string;
  verifier: string;
  next: string;
}

export const cookieOptions = (maxAge: number) =>
  ({ httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge }) as const;

// AES-256-GCM with a key from SESSION_SECRET: the cookie can't be read or changed in the browser.
function key(): Buffer {
  return createHash("sha256").update(SESSION_SECRET).digest();
}

export function seal(data: object): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), body].map((part) => part.toString("base64url")).join(".");
}

export function unseal<T>(value: string | undefined): T | null {
  const [iv, tag, body] = (value || "").split(".");
  if (!iv || !tag || !body) {
    return null;
  }
  try {
    const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));
    const json = Buffer.concat([decipher.update(Buffer.from(body, "base64url")), decipher.final()]).toString("utf8");
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/** The access token has run out (or is about to): refresh before calling the API. */
export function accessExpired(session: Session): boolean {
  return session.accessExpires <= Date.now() / 1000;
}

export async function getSession(): Promise<Session | null> {
  return unseal<Session>((await cookies()).get(SESSION_COOKIE)?.value);
}

/** The shop's sign-in page, with a fresh state and PKCE verifier to keep until the customer comes back. */
export function startSignIn(next: string): { url: string; signIn: SignIn } {
  const signIn: SignIn = {
    state: randomBytes(16).toString("base64url"),
    verifier: randomBytes(32).toString("base64url"),
    next: safeNext(next),
  };
  const params = new URLSearchParams({
    action: "waas-account-authorize",
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: signIn.state,
    code_challenge: createHash("sha256").update(signIn.verifier).digest("base64url"),
    code_challenge_method: "S256",
  });

  return { url: `${SHOP_URL}/wp-login.php?${params}`, signIn };
}

/** Swaps a code for a session. Null when the shop refuses it. */
export function exchangeCode(code: string, verifier: string): Promise<Session | null> {
  return tokenRequest({ grant_type: "authorization_code", code, redirect_uri: REDIRECT_URI, code_verifier: verifier });
}

/** New tokens for the session. Null when it has ended (signed out elsewhere, or refreshed twice). */
export function refreshSession(session: Session): Promise<Session | null> {
  return tokenRequest({ grant_type: "refresh_token", refresh_token: session.refreshToken });
}

export async function revokeSession(session: Session): Promise<void> {
  await fetch(`${API}/revoke`, {
    method: "POST",
    body: new URLSearchParams({ token: session.refreshToken, client_id: CLIENT_ID, client_secret: CLIENT_SECRET }),
    cache: "no-store",
  }).catch(() => undefined);
}

async function tokenRequest(params: Record<string, string>): Promise<Session | null> {
  const response = await fetch(`${API}/token`, {
    method: "POST",
    body: new URLSearchParams({ ...params, client_id: CLIENT_ID, client_secret: CLIENT_SECRET }),
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    // A little early, so a token never runs out mid-request.
    accessExpires: Math.floor(Date.now() / 1000) + Number(data.expires_in) - 30,
  };
}

/** Thrown when the access token isn't accepted: the page refreshes the session and tries again. */
export class SignedOut extends Error {}

/** A call to the account API as the signed-in customer. Errors carry the shop's own message, written for customers. */
export async function accountApi<T>(session: Session, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${session.accessToken}` },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    throw new SignedOut();
  }
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data as T;
}

/** Only paths on this site, so a sign-in link can't send the customer elsewhere afterwards. */
export function safeNext(next: string | null | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/account";
}

export interface Website {
  id: number;
  domain: string;
  status: string;
  status_label: string;
  active_until: string | null;
  can_log_in: boolean;
  needs_new_name: boolean;
  manage_plan_url: string;
  /** Checkout for more emails for this website; null when the shop sells none. */
  buy_emails_url?: string | null;
}

export interface DnsRecord {
  type: string;
  value: string;
}

export interface Websites {
  websites: Website[];
  custom_address_records: { apex: DnsRecord[]; subdomain: DnsRecord[] } | null;
}

export interface Me {
  id: number;
  email: string;
  name: string;
}
