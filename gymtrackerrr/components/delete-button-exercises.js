"use client"
// Used in account page
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import WarningPopup from "./warning-popup";


export default function DeleteButton({ exercises }) {
  const supabase = createClientComponentClient();
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [showWarning, setShowWarning] = useState(false); // State showing/hiding the warning modal
  const router = useRouter();

  const handleShow = () => {
    if(selectedExerciseId) {
      setShowWarning(true);
    }
  };

  const handleClose = () => {
    setShowWarning(false);
  };

  // Deletes from supabase
  const handleDelete = async () => {
    try {
      // Check if a exercise is selected
      if (!selectedExerciseId) {
        console.error("Please select an exercise to delete");
        return;
      }

      // Fetch the Reps to get related information (foreign key relationships)
      // Perhaps could be made more efficient
      const { data: exerciseData, error: exerciseError } = await supabase
      .from("Reps")
      .select("*")
      .eq("Exercise_id", selectedExerciseId);

      // Error Checking
      if (exerciseError) {
        console.error("Error fetching exercise data:", exerciseError);
        return;
      }

      // Delete Reps first
      await supabase.from("Reps").delete().eq("Exercise_id", selectedExerciseId);

    
      // Delete the selected exercise from Supabase
      await supabase.from("Exercises").delete().eq("id", selectedExerciseId);

      // Clear the selected exercise after deletion
      setSelectedExerciseId("");
      router.refresh();

      handleClose();

    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  

  return (
    <div>
      <label>Select Exercise to Delete: </label>
      {/* Dropdown menu for selecting the exercise to delete */}
      <select
        value={selectedExerciseId}
        onChange={(e) => setSelectedExerciseId(e.target.value)}
      >
        {/* Default option(cannot be deleted) */}
        <option value="" disabled>
          Choose Exercise
        </option>
        {/* Goes through exercise to populate dropdown menu */}
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.Exercise}
          </option>
        ))}
      </select>
      {/* Button that triggers the warning modal */}
      <button onClick={handleShow}>Delete Exercise</button>

      {/* Warning Popup Component */}
      <WarningPopup
        show={showWarning}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
  );
}