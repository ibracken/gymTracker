'use client'
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LogoutButton(){
    const supabase = createClientComponentClient();
    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        } else {
            // Optionally, redirect or perform some action after successful logout
            console.log('Successfully signed out');
            window.location.reload();
        }
    }

    return (
        <button 
        onClick={signOut}
        style={{
            position: 'fixed', // Fixed position
            top: '10px',       // 10px from the top
            right: '10px',     // 10px from the right
        }}
        >Logout</button>
    );
}