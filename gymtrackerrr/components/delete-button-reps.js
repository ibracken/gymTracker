"use client"
// Used in account page
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import WarningPopup from "./warning-popup";


export default function DeleteButtonRep({ rep_id }) {
  const supabase = createClientComponentClient();
  const [showWarning, setShowWarning] = useState(false); // State showing/hiding the warning modal
  const router = useRouter();

  const handleShow = () => {
    setShowWarning(true);
  };

  const handleClose = () => {
    setShowWarning(false);
  };

  // Deletes from supabase
  const handleDelete = async () => {
    try {

      // Delete Reps first
      await supabase.from("Reps").delete().eq("id", rep_id);

      router.refresh();

      handleClose();

    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  

  return (
    <div>
      {/* Button that triggers the warning modal */}
      <button onClick={handleShow}>Delete Rep</button>

      {/* Warning Popup Component */}
      <WarningPopup
        show={showWarning}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
  );
}