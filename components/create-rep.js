// Used in account page

"use client"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import styles from "./postList.module.css"

// Input is the exercises data
export default function CreateRep({ exercises }) {
  const supabase = createClientComponentClient();
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [repInput, setRepInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const router = useRouter();

  const chooseExercises = async () => {
    try {
        // Check if exercise is selected
        if (!selectedExerciseId) {
            console.error("Please select an exercise to add rep: ");
            return;
        }

        // Check if rep and weight inputs are numbers
        if (!repInput || !weightInput || isNaN(repInput) || isNaN(weightInput)) {
            console.error("Please enter rep and weight values");
            return;
        }

        await supabase.from("Reps").insert({
            // Inserts these items into supabase, rest of exercise is randomly generated or null
            Rep: repInput,
            Weight: weightInput,
            Exercise_id: selectedExerciseId,
    });

    // Clears exerciseID after adding to supabase
    setSelectedExerciseId("");
    setRepInput("");
    setWeightInput("");
    // Refresh the router to update the page with the new rep
    router.refresh();
    } catch (error) {
        console.error("Error choosing exercise:", error);
    }
  }

  return (
    <div className={styles.otherGridItem}>
      <label>Select exercise to add rep: </label>
      <select
        value={selectedExerciseId}
        onChange={(e) => {
          setSelectedExerciseId(e.target.value);
        }}
      >
        {/* Default option (cannot have rep added) */}
        <option value="" disabled>
          Choose Exercise
        </option>
        {/* Goes through exercises to populate dropdown menu */}
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.Exercise}
          </option>
        ))}
      </select>

      {/* Text box for rep input */}
      <label> Rep: </label>
      <input
        type="text"
        placeholder="Reps"
        value={repInput}
        onChange={(e) => setRepInput(e.target.value)}
      />

      {/* Text box for weight input */}
      <label>Weight:</label>
      <input
        type="text"
        placeholder="lbs"
        value={weightInput}
        onChange={(e) => setWeightInput(e.target.value)}
      />

      {/* Button to trigger the creation of the rep */}
      <button onClick={chooseExercises}>Add Rep</button>
    </div>
  );
}