import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function fetchPosts() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("Exercises")
    .select("*")
    .eq("user_id", user.id);

  return data;
}

export default async function PostList() {
  const Exercises = await fetchPosts();
  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {Exercises?.map((post) => (
          <li key={post.id}>{post.Exercise}</li>
        ))}
      </ul>
    </div>
  );
}