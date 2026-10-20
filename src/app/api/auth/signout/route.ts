import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, cookieOptions, getSession, revokeSession } from "@/lib/account";

/** Ends the session on the shop too. POST only, so a link elsewhere can't sign the customer out. */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (session) {
    await revokeSession(session);
  }
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(SESSION_COOKIE, "", cookieOptions(0));

  return response;
}
