import { supabase } from "@supabase/auth-ui-shared"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

import CreatePost from "@/components/create-post";
import PostList from "@/components/post-list";

export default async function AccountPage() {
    const supabase = createServerComponentClient({cookies});
    const session = await supabase.auth.getUser();
    const user = session?.data.user;
    return (
        <div>
            <h1>Account Page!</h1>
            {session ? (
                <div>
                    <h1> Hello, {user.email}</h1>
                </div>
            ) : (
                <div>
                    <h1>not authenticated</h1>
                </div>
            )}
            <PostList />
            <CreatePost />
        </div>
    )
}