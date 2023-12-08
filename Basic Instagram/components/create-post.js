"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const supabase = createClientComponentClient();
  const [caption, setCaption] = useState("");
  const router = useRouter();

  async function createPost() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase.from("posts").insert({
        user_id: user.id,
        caption: caption,
      });

      setCaption("");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}