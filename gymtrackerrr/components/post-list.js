import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


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
    .eq("Exercise_id", Exercise_id);

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
      <div>
        <h1>Exercises</h1>
        <ul>
          {Exercises?.map((exercise, exerciseIndex) => (
            <li key={exercise.id}>
              <h4>{exercise.Exercise}</h4>
              <label> Recent Reps:</label>
              <ul>
               {/* Map through the reps array for the current exercise and render each rep */}
              {repsResults[exerciseIndex]?.length > 0 ? (
                repsResults[exerciseIndex].map((rep) => (
                  <li key={rep.id}>
                    Reps: {rep.Rep}, Weight: {rep.Weight}lbs
                  </li>
                ))
              ) : (
                <li>none</li>
              )}
              </ul>
              {PRResults[exerciseIndex]?.map((rep) => (
                <label key ={rep.id}>
                  Personal Record: {rep.Weight}lbs
                </label>
              ))}
              {/* Render the ExerciseFullReps component for each exercise using exercise_id in the link*/}
              <Link href={`${exercise.id}`}>
              View Full Reps
              </Link>
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