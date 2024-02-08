// pages/resetPassword.js
import ResetPasswordForm from "@/components/reset-password-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ResetPasswordPage() {
    const supabase = createServerComponentClient({cookies});
    const session = await supabase.auth.getUser();
    const user = session?.data.user;


    return (
        <div>
            <h1>Reset Your Password</h1>
            {/* {user.email} */}
            <ResetPasswordForm />
        </div>
    );
}
