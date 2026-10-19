import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  cookieOptions,
  getSession,
  refreshSession,
  safeNext,
  seal,
} from "@/lib/account";

/** Pages can't set cookies, so they send the customer here when the access token has run out. */
export async function GET(request: NextRequest) {
  const next = safeNext(request.nextUrl.searchParams.get("next"));
  const session = await getSession();
  const fresh = session ? await refreshSession(session) : null;
  if (!fresh) {
    // The session has ended: sign in again, and come back to the same page.
    const response = NextResponse.redirect(new URL(`/api/auth/signin?next=${encodeURIComponent(next)}`, request.url));
    response.cookies.set(SESSION_COOKIE, "", cookieOptions(0));
    return response;
  }

  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(SESSION_COOKIE, seal(fresh), cookieOptions(SESSION_MAX_AGE));

  return response;
}
