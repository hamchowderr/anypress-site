import { NextResponse, connection, type NextRequest } from "next/server";
import { ACCOUNT_URL } from "@/lib/site";
import { SIGN_IN_COOKIE, accountSignInEnabled, cookieOptions, seal, startSignIn } from "@/lib/account";

/** Sends the customer to the shop to sign in; they come back to /api/auth/callback. */
export async function GET(request: NextRequest) {
  // Never prerendered: every sign-in needs its own state and verifier.
  await connection();
  if (!accountSignInEnabled()) {
    return NextResponse.redirect(ACCOUNT_URL);
  }
  const { url, signIn } = startSignIn(request.nextUrl.searchParams.get("next") || "/account");
  const response = NextResponse.redirect(url);
  // Ten minutes to sign in on the shop.
  response.cookies.set(SIGN_IN_COOKIE, seal(signIn), cookieOptions(600));

  return response;
}
