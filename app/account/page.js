import { supabase } from "@supabase/auth-ui-shared"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";


import CreatePost from "@/components/create-post";
import PostList from "@/components/post-list";
import DeleteButton from "@/components/delete-button-exercises";
import CreateRep from "@/components/create-rep";
import styles from "./account.module.css";

export default async function AccountPage() {
    const supabase = createServerComponentClient({cookies});
    const session = await supabase.auth.getUser();
    const user = session?.data.user;

    let exercises = [];

    // Fetch posts
    const fetchPosts = async () => {
        // User authentication
        const {
          data: { user },
        } = await supabase.auth.getUser();
        // Gathers 'data' from supabase
        const { data } = await supabase
          .from("Exercises")
          .select("*")
          .eq("user_id", user.id);
  
          exercises = data;
      };
    
    //   Gathers posts from supabase before rendering page
    await fetchPosts();
    
    return (
        <div className = {styles.margin}>
            <div className={styles.img}></div>
            <div className = {styles.overlayText}>
                {/* Conditional rendering based on user authentication */}
                {session ? (
                    <div>
                        <h1 className={styles.accountGridTitle}> Hello, {user.email}</h1>
                    </div>
                ) : (
                    <div>
                        <h1>not authenticated</h1>
                    </div>
                )}
                <CreatePost />
                <DeleteButton exercises = {exercises}/>
                <CreateRep exercises = {exercises}/>
                <PostList/>
            </div>
        </div>
    )
}