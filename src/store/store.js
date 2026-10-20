
import { configureStore } from "@reduxjs/toolkit";

import jobsReducer from "./jobsSlice";
import savedJobsReducer from "./savedJobsSlice";
import applicationsReducer from "./applicationsSlice";
import alertsReducer from "./alertsSlice";
import profileReducer from "./profileSlice";

// Save profile changes to localStorage
const profilePersistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (action.type === "profile/updateProfile") {
    try {
      const profile = storeAPI.getState().profile;
      localStorage.setItem(
        "careerNestProfile",
        JSON.stringify(profile)
      );
    } catch (error) {
      console.error("Unable to persist profile:", error);
    }
  }

  return result;
};

// Save saved-job changes to localStorage
const savedJobsPersistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const savedJobActions = [
    "savedJobs/saveJobToStore",
    "savedJobs/removeSavedJobFromStore",
    "savedJobs/clearSavedJobs",
  ];

  if (savedJobActions.includes(action.type)) {
    try {
      const savedJobs = storeAPI.getState().savedJobs;
      localStorage.setItem(
        "careerNestSavedJobs",
        JSON.stringify(savedJobs)
      );
    } catch (error) {
      console.error("Unable to persist saved jobs:", error);
    }
  }

  return result;
};

// Log Redux actions
const loggingMiddleware = () => (next) => (action) => {
  console.log("CareerNest Redux Action:", action.type);
  return next(action);
};

// Configure Redux store
export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    savedJobs: savedJobsReducer,
    applications: applicationsReducer,
    alerts: alertsReducer,
    profile: profileReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profilePersistenceMiddleware,
      savedJobsPersistenceMiddleware,
      loggingMiddleware
    ),
});
