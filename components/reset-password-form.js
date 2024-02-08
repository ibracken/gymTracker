'use client'

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const supabase = createClientComponentClient();


    async function redirect() {
      window.location.href = '/account';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const session = supabase.auth.setSession();
      
        if (session) {
          const { error } = await supabase.auth.updateUser({
            // accessToken may not exist
             accessToken: session.access_token,
             password: newPassword,
          });
          if (error) {
            alert('Failed to update password: ' + error.message);
          } else {
            alert('Password updated successfully!');
          }
        } else {
          alert('No active session found. Please log in again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Update Password</button>
            </form>
            <button type = "move-on" onClick={redirect}> Carry on to Account Without Changing Passwords</button>
        </div>
    );
}
