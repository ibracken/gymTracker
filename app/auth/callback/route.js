import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


// Might need to update for new sign in methods

export async function GET(req) {
  // Initialize the Supabase client specifically for route handling in Next.js.
  const supabase = createRouteHandlerClient({ cookies });

  // Extract the search parameters from the request URL.
  const { searchParams } = new URL(req.url);

  // Retrieve the 'code' from the URL query parameters.
  // This code is provided by Supabase as part of the authentication flow, 
  // typically when using magic links or third-party providers.
  const code = searchParams.get("code");

  // If a code is present, exchange it for a user session.
  // This is a crucial step in the authentication flow where the temporary code
  // is exchanged for a session token, which can then be used to authenticate the user.
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // After successfully exchanging the code for a session, redirect the user to the account page.
  // This is a standard post-login redirect to a user-specific or protected page.
  return NextResponse.redirect(new URL("/account", req.url));
}
