"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  SignedOut,
  accessExpired,
  accountApi,
  cookieOptions,
  getSession,
  refreshSession,
  seal,
  type Session,
} from "@/lib/account";

/** Opens the website's WordPress admin with a fresh one-time sign-in link, made on the click. */
export async function logInToWebsite(formData: FormData) {
  const id = websiteId(formData);
  const link = await asCustomer<{ url: string }>(`/websites/${id}/login`, { method: "POST" });

  redirect(link.url);
}

/** Makes the customer's own domain the website's address, once its records are in place. */
export async function useOwnDomain(formData: FormData) {
  const id = websiteId(formData);
  const domain = String(formData.get("domain") || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
  if (!domain) {
    back("Type the domain you want to use, like example.com.");
  }
  await asCustomer(`/websites/${id}/address`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain }),
  });

  back(`Done. Your website is moving to ${domain}. The old address keeps working for a few minutes.`, "done");
}

/** A new website name, when the one picked at checkout was taken. */
export async function chooseNewName(formData: FormData) {
  const id = websiteId(formData);
  const name = String(formData.get("name") || "").trim();
  if (!name) {
    back("Type a name for your website.");
  }
  const result = await asCustomer<{ message?: string }>(`/websites/${id}/name`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  back(result.message || "Thank you! We're setting up your website with its new name.", "done");
}

function websiteId(formData: FormData): number {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) {
    redirect("/account");
  }

  return id;
}

/** Back to the account page with a message: an error by default, or "done" for a success. */
function back(message: string, kind: "error" | "done" = "error"): never {
  redirect(`/account?${kind}=${encodeURIComponent(message)}`);
}

/** A call to the account API, refreshing the session once if it has run out. Errors go back to the page. */
async function asCustomer<T>(path: string, init: RequestInit): Promise<T> {
  let session = await getSession();
  if (!session) {
    redirect("/api/auth/signin?next=/account");
  }

  if (accessExpired(session)) {
    session = await keepFresh(session);
  }
  // redirect() works by throwing, so it stays outside the try blocks.
  let failure: unknown;
  try {
    return await accountApi<T>(session, path, init);
  } catch (error) {
    failure = error;
  }
  if (failure instanceof SignedOut) {
    session = await keepFresh(session);
    try {
      return await accountApi<T>(session, path, init);
    } catch (error) {
      failure = error;
    }
  }

  back(failure instanceof Error && !(failure instanceof SignedOut) ? failure.message : "Something went wrong. Please try again.");
}

async function keepFresh(session: Session): Promise<Session> {
  const fresh = await refreshSession(session);
  if (!fresh) {
    redirect("/api/auth/signin?next=/account");
  }
  (await cookies()).set(SESSION_COOKIE, seal(fresh), cookieOptions(SESSION_MAX_AGE));

  return fresh;
}
