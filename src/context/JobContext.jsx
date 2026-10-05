import { createContext, useContext } from "react";
import useJobs from "../hooks/useJobs";
import useApplications from "../hooks/useApplications";

const JobContext = createContext(null);

export function JobProvider({ children }) {
  const jobsData = useJobs();
  const applicationData = useApplications();

  const value = {
    ...jobsData,
    ...applicationData
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error(
      "useJobContext must be used inside JobProvider"
    );
  }

  return context;
}

export default JobContext;