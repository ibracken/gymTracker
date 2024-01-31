import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";


async function signOut() {
    const { error } = await supabase.auth.signOut()
}
  