import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  console.log("Reset password route hit", request.url);
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Call the Supabase function to initiate a password reset email
    const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: `${requestUrl.origin}/reset-password`
    });
    
    return NextResponse.redirect(requestUrl.origin, {
        status: 301,
      })
}
