import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function fetchPosts() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id);

  return data;
}

export default async function PostList() {
  const posts = await fetchPosts();
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.caption}</li>
        ))}
      </ul>
    </div>
  );
}