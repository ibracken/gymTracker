// Import necessary modules
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import DeleteButtonRep from "@/components/delete-button-reps";

import styles from "./exercise_id.module.css";


// Fetch exercises
const fetchExercise = async (params) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("Exercises")
    .select("*")
    .eq("id", params.exercise_id)
    .limit(1);

  return data[0];
};

// Fetch reps
const fetchReps = async (params) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("Reps")
    .select("*")
    .eq("Exercise_id", params.exercise_id)
    .order("created_at", { ascending: false });

  return data;
};

// ExerciseFullPage component
export default async function ExerciseFullPage({ params }) {
  const supabase = createServerComponentClient({ cookies });

  // User authentication
  const session = await supabase.auth.getUser();
  const user = session?.data.user;

  // Gathers posts from supabase before rendering page
  const exercise = await fetchExercise(params);
  const reps = await fetchReps(params);

  return (
    <div className={styles.margin}>
      <div className={styles.img}></div>
      <Link href="/account" className={styles.backButton}>Back to Account</Link>
      <div className={styles.overlayText}>
        <h1 className={styles.repGridTitle}>Full list of reps for: {exercise.Exercise}(recent at top)</h1>
        <div className={styles.repGridContainer}>
            <ul className={styles.repGrid}>
            {reps.map((rep, index) => (
                <li key={index} className={styles.repGridItem}>
                Reps: {rep.Rep} Weight: {rep.Weight}lbs <DeleteButtonRep rep_id={rep.id} />
                </li>
            ))}
            </ul>
        </div>
     </div>
    </div>
  );
}