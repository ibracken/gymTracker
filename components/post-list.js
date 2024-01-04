import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from "./postList.module.css"

import Link from "next/link";

async function fetchExercises() {
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

async function fetchReps(Exercise_id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("Reps")
    .select("*")
    .eq("Exercise_id", Exercise_id)
    .order("created_at", { ascending: false }) // Order by the creation timestamp in descending order
    .limit(3); // Limit the result to the three most recent reps

  return data;
}

async function fetchPR(Exercise_id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("Reps")
    .select("*")
    .eq("Exercise_id", Exercise_id)
    .order("Weight", { ascending: false }) // Order by "Weight" so largest is at the top
    .limit(1); // Limit the result to one row

  return data;
}


// ... (imports and data fetching functions)

export default async function PostList() {
  try {
    const Exercises = await fetchExercises();

    const repsPromises = Exercises.map((exercise) => fetchReps(exercise.id));
    const repsResults = await Promise.all(repsPromises);

    const PRPromises = Exercises.map((exercise) => fetchPR(exercise.id));
    const PRResults = await Promise.all(PRPromises);

    return (
      <div className={styles.accountGridContainer}>
        <ul className={styles.ul}>
          {Exercises?.map((exercise, exerciseIndex) => (
            <li key={exercise.id}>
              <h4 className={styles.accountGridTitle}> Recent {exercise.Exercise} Reps:</h4>
              <ul className={styles.accountGrid}>
               {/* Map through the reps array for the current exercise and render each rep */}
              {repsResults[exerciseIndex]?.length > 0 ? (
                repsResults[exerciseIndex].map((rep) => (
                  <li key={rep.id} className = {styles.accountGridItem}>
                    Reps: {rep.Rep}, Weight: {rep.Weight}lbs
                  </li>
                ))
              ) : (
                <li>none</li>
              )}
              </ul>
              {PRResults[exerciseIndex]?.map((rep) => (
                <label key ={rep.id} className = {styles.prGridItem}>
                  Personal Record: {rep.Weight}lbs
                </label>
              ))}
              {/* Render the ExerciseFullReps component for each exercise using exercise_id in the link*/}
              <div className={styles.link}>
              <Link href={`${exercise.id}`}>
                  View Full Reps
              </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error or return an error state
    return <div>Error fetching data</div>;
  }
}