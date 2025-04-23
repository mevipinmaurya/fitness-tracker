## Fitness Tracker App

This App is actually to manage my calories and workout for every morning. because I sat in front of my laptop for almost 10 hours a day
and never had time to workout, So I decided to make this app for myself :) hope this will useful for you also.

![Alt text](/screenshots/dashboard.png "a title")

![Alt text](/screenshots/login.png "a title")

![Alt text](/screenshots/workout.png "a title")

## How to use

First that you need setup the Firebase Firestore and Firebase auth. because this project is actually for realtime tracking. Put the credentials of firebase in `.env` file see the example below:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

```

for firebase you should see the firebase documentation for how to configure the API_KEY and AUTH_DOMAIN etc. follow the instructions from the link below:

Firebase Firestore [Firebase Firestore](https://firebase.google.com/docs/firestore).
Firebase Realtime Database [Firebase Realtime Database](https://firebase.google.com/docs/database).
Firebase Authentication [Firebase Authentication](https://firebase.google.com/docs/auth).

Okay Finish for setting firebase and I will explain about my code that I used for this bounty

### Switch Statement

for the switch statement i used it to 2 file location in this project. In the hook folder and workout folder

```js
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
```

The code that I've provided is a JavaScript reducer function typically used in a Redux or similar state management system. It handles different actions and updates the state accordingly. The actions are defined in some external constant file (not shown in your code) as `ACTIONS.FETCHING_EXERCISES`, `ACTIONS.FETCHING_WORKOUTS`, `ACTIONS.SET_EXERCISES`, and `ACTIONS.SET_WORKOUTS`. These actions appear to be related to fetching exercises and workouts and updating the state accordingly.

Here's an explanation of what each case does:

`ACTIONS.FETCHING_EXERCISES`: This action is used to indicate that exercises are being fetched. It sets the isFetchingExercises property to true.

`ACTIONS.FETCHING_WORKOUTS`: This action is used to indicate that workouts are being fetched. It sets the isFetchingWorkouts property to true.

`ACTIONS.SET_EXERCISES`: This action is used to set the exercises in the state when the data has been fetched. It updates the exercises property with the payload and sets isFetchingExercises to false.

`ACTIONS.SET_WORKOUTS`: This action is used to set the workouts in the state when the data has been fetched. It updates the workouts property with the payload and sets isFetchingWorkouts to false.

default: If the type provided doesn't match any of the defined action types, the reducer will throw an error to indicate that an unhandled action type has been encountered.

This reducer function is designed to work with an initial state, and i would typically use it in conjunction with a state management library like Redux to handle state updates in a predictable and centralized way within my application.

```js
export const rootReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case ACTIONS.START_WORKOUT:
      draft.workoutInProgress = true;
      break;
    case ACTIONS.DISCARD_WORKOUT:
      draft.exercises = {};
      draft.workoutInProgress = false;
      break;
    case ACTIONS.UPDATE_WEIGHT:
      draft.exercises[payload.exerciseId].sets[payload.setId].weight =
        payload.newWeight;
      break;
    case ACTIONS.UPDATE_REPS:
      draft.exercises[payload.exerciseId].sets[payload.setId].reps =
        payload.newReps;
      break;
    case ACTIONS.ADD_EXERCISE:
      draft.exercises[payload.exerciseId] = payload.exercise;
      break;
    case ACTIONS.ADD_SET:
      draft.exercises[payload.exerciseId].sets[payload.setId] = DEFAULT_SET;
      break;
    case ACTIONS.REMOVE_SET:
      delete draft.exercises[payload.exerciseId].sets[payload.setId];
      break;
    case ACTIONS.REMOVE_EXERCISE:
      delete draft.exercises[payload.exerciseId];
      break;
    case ACTIONS.TOGGLE_FINISHED:
      draft.exercises[payload.exerciseId].sets[payload.setId].isFinished =
        !draft.exercises[payload.exerciseId].sets[payload.setId].isFinished;
      break;
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
});
```

For this reducer I'm using immer module for immutable data, In this case, the reducer function is designed to work with a draft state, and it updates that draft state based on various actions. Here's an explanation of what each case does:

`ACTIONS.START_WORKOUT`: This action is used to indicate that a workout has started. It sets the workoutInProgress property to true in the draft state.

`ACTIONS.DISCARD_WORKOUT`: This action is used to discard a workout. It resets the exercises to an empty object and sets workoutInProgress to false in the draft state.

`ACTIONS.UPDATE_WEIGHT`: This action is used to update the weight for a specific set within an exercise. It modifies the weight property of the specified set in the draft state.

`ACTIONS.UPDATE_REPS`: This action is used to update the number of repetitions for a specific set within an exercise. It modifies the reps property of the specified set in the draft state.

`ACTIONS.ADD_EXERCISE`: This action is used to add a new exercise to the draft state. It adds the exercise object to the exercises property using the exerciseId as the key.

`ACTIONS.ADD_SET`: This action is used to add a new set to an existing exercise. It adds a new set (presumably with default values) to the specified exercise in the draft state.

`ACTIONS.REMOVE_SET`: This action is used to remove a set from an existing exercise. It deletes the specified set from the exercise in the draft state.

`ACTIONS.REMOVE_EXERCISE`: This action is used to remove an exercise. It deletes the specified exercise from the exercises object in the draft state.

`ACTIONS.TOGGLE_FINISHED`: This action is used to toggle the "finished" status of a specific set within an exercise. It toggles the isFinished property of the specified set in the draft state.

default: If the type provided doesn't match any of the defined action types, the reducer will throw an error to indicate that an unhandled action type has been encountered.

This reducer function is used in combination with a state management system (like Redux with Immer) to handle state updates in a more convenient and readable manner. The produce function from Immer ensures that I can work with a draft state and still achieve immutability while making my code more readable and less error-prone.

### Try, Catch and Finally Statement

For this project I used to write about some statement _Try, Catch and Finally_ for call the data from firestore.

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = values;

  if (!email || !password) {
    return setError("Please fill in all fields");
  }

  try {
    setLoading(true);
    await signUp(email, password);
    navigate("/");
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

for the example above mostly used the try catch statement for handle button submit for register, login, and change the profile form.
