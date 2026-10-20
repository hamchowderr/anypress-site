import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  SIGN_IN_COOKIE,
  type SignIn,
  cookieOptions,
  exchangeCode,
  seal,
  unseal,
} from "@/lib/account";

/** The shop sends the customer back here with a one-time code, swapped for tokens server to server. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const signIn = unseal<SignIn>(request.cookies.get(SIGN_IN_COOKIE)?.value);
  const state = params.get("state") || "";
  const code = params.get("code") || "";

  // The state must be the one this browser was sent off with, so nobody can sign it in to their own account.
  const session =
    signIn && code && sameString(state, signIn.state) ? await exchangeCode(code, signIn.verifier) : null;

  const response = NextResponse.redirect(
    new URL(session && signIn ? signIn.next : "/account?error=sign-in", request.url),
  );
  response.cookies.set(SIGN_IN_COOKIE, "", cookieOptions(0));
  if (session) {
    response.cookies.set(SESSION_COOKIE, seal(session), cookieOptions(SESSION_MAX_AGE));
  }

  return response;
}

function sameString(a: string, b: string): boolean {
  return a.length === b.length && a.length > 0 && timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
