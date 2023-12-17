"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const supabase = createClientComponentClient();
  const [Exercise, setExercise] = useState("");
  const router = useRouter();

  async function createPost() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase.from("Exercises").insert({
        user_id: user.id,
        Exercise: Exercise,
      });

      setExercise("");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Create Exercises</h1>
      <input
        type="text"
        placeholder="Exercise"
        value={Exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      <button onClick={createPost}>Create Exercise</button>
    </div>
  );
}