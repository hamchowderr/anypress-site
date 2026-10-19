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
  const id = Number(formData.get("id"));
  let session = await getSession();
  if (!session || !Number.isInteger(id) || id <= 0) {
    redirect("/api/auth/signin?next=/account");
  }

  let link: { url: string };
  try {
    if (accessExpired(session)) {
      session = await keepFresh(session);
    }
    link = await accountApi<{ url: string }>(session, `/websites/${id}/login`, { method: "POST" });
  } catch (error) {
    if (!(error instanceof SignedOut)) {
      redirect(`/account?error=${encodeURIComponent(error instanceof Error ? error.message : "")}`);
    }
    session = await keepFresh(session);
    link = await accountApi<{ url: string }>(session, `/websites/${id}/login`, { method: "POST" });
  }

  redirect(link.url);
}

async function keepFresh(session: Session): Promise<Session> {
  const fresh = await refreshSession(session);
  if (!fresh) {
    redirect("/api/auth/signin?next=/account");
  }
  (await cookies()).set(SESSION_COOKIE, seal(fresh), cookieOptions(SESSION_MAX_AGE));

  return fresh;
}
