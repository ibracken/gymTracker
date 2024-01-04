"use client";
// Used in account page
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./postList.module.css"

export default function CreatePost() {
  // establishes hooks
  const supabase = createClientComponentClient();
  const [Exercise, setExercise] = useState("");
  const router = useRouter();

  async function createPost() {
    // Accesses authenticated user from supabase
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!Exercise) {
        console.error("Please select an exercise to delete");
        return;
      }

      await supabase.from("Exercises").insert({
        // Inserts these items into supabase, rest of exercise is randomly generated or null
        user_id: user.id,
        Exercise: Exercise,
      });

      setExercise("");
      // Refresh the router to update the page with the new exercise
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  // Renders function
  return (
    <div className={styles.otherGridItem}>
      <label>Create Exercises: </label>
      {/* Input field */}
      <input
        type="text"
        placeholder="Exercise"
        value={Exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      {/* Button that triggers the function */}
      <button onClick={createPost}>Create Exercise</button>
    </div>
  );
}