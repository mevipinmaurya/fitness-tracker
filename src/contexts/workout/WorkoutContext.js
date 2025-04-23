import React, { useContext, useEffect, useReducer } from "react";
import { initializer, rootReducer } from "./WorkoutReducer";

const { createContext } = require("react");

const WorkoutStateContext = createContext();
const WorkoutDispatchContext = createContext();

export const useWorkoutState = () => useContext(WorkoutStateContext);
export const useWorkoutDispatch = () => useContext(WorkoutDispatchContext);

export const WorkoutProvider = ({ children }) => {
  const [workoutState, dispatch] = useReducer(rootReducer, initializer);

  useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workoutState));
  }, [workoutState]);

  return (
    <WorkoutStateContext.Provider value={workoutState}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorkoutStateContext.Provider>
  );
};
