'use client'
// Used in login page
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import React, { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        // Trigger a full page reload
        window.location.reload();
      }
    });

    return () => {
  }});

  return (

    
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={true}
      providers={[]}
    //   Make sure redirectTo is the right localhost
      redirectTo="http://localhost:3000/reset-password"
    />
    
  )
}