import { useEffect, useReducer } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { formatDocument } from "../helpers";
import { db } from "../firebase";

// Define action types
const ACTIONS = {
  FETCHING_EXERCISES: "FETCHING_EXERCISES",
  FETCHING_WORKOUTS: "FETCHING_WORKOUTS",
  SET_EXERCISES: "SET_EXERCISES",
  SET_WORKOUTS: "SET_WORKOUTS",
};

// Define initial state
const initialState = {
  isFetchingExercises: false,
  isFetchingWorkouts: false,
  exercises: [],
  workouts: [],
};

// Reducer function to update the state based on actions
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCHING_EXERCISES:
      return {
        ...state,
        isFetchingExercises: true,
      };
    case ACTIONS.FETCHING_WORKOUTS:
      return {
        ...state,
        isFetchingWorkouts: true,
      };
    case ACTIONS.SET_EXERCISES:
      return {
        ...state,
        exercises: payload,
        isFetchingExercises: false,
      };
    case ACTIONS.SET_WORKOUTS:
      return {
        ...state,
        workouts: payload,
        isFetchingWorkouts: false,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

// Custom hook to manage state and data fetching
function useWorkoutDb() {
  const [workoutDbState, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch exercises
    dispatch({ type: ACTIONS.FETCHING_EXERCISES });

    const exercisesCollection = collection(db, "exercises");
    const exercisesQuery = query(
      exercisesCollection,
      where("userId", "==", user.uid)
    );

    const unsubscribeExercises = onSnapshot(exercisesQuery, (snapshot) => {
      const exercises = snapshot.docs.map((doc) => formatDocument(doc));
      dispatch({ type: ACTIONS.SET_EXERCISES, payload: exercises });
    });

    return () => {
      unsubscribeExercises();
    };
  }, [user]);

  useEffect(() => {
    // Fetch workouts
    dispatch({ type: ACTIONS.FETCHING_WORKOUTS });

    const workoutsCollection = collection(db, "workouts");
    const workoutsQuery = query(
      workoutsCollection,
      where("userId", "==", user.uid)
    );

    const unsubscribeWorkouts = onSnapshot(workoutsQuery, (snapshot) => {
      const workouts = snapshot.docs.map((doc) => formatDocument(doc));
      dispatch({ type: ACTIONS.SET_WORKOUTS, payload: workouts });
    });

    return () => {
      unsubscribeWorkouts();
    };
  }, [user]);

  return workoutDbState;
}

export default useWorkoutDb;
