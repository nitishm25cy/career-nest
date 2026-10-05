import { useCallback, useEffect, useMemo, useState } from "react";

function useApplications() {

  const [applications, setApplications] = useState(() => {
    const saved =
      localStorage.getItem("careerNestApplications");

    return saved ? JSON.parse(saved) : [];
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved =
      localStorage.getItem("careerNestSavedJobs");

    return saved ? JSON.parse(saved) : [];
  });

  const [jobAlerts, setJobAlerts] = useState(() => {
    const saved =
      localStorage.getItem("careerNestJobAlerts");

    return saved ? JSON.parse(saved) : [];
  });


  // Synchronize applications
  useEffect(() => {
    localStorage.setItem(
      "careerNestApplications",
      JSON.stringify(applications)
    );
  }, [applications]);


  // Synchronize saved jobs
  useEffect(() => {
    localStorage.setItem(
      "careerNestSavedJobs",
      JSON.stringify(savedJobs)
    );
  }, [savedJobs]);


  // Synchronize alerts
  useEffect(() => {
    localStorage.setItem(
      "careerNestJobAlerts",
      JSON.stringify(jobAlerts)
    );
  }, [jobAlerts]);


  // Save job
  const saveJob = useCallback((jobId) => {
    setSavedJobs((previous) => {

      if (previous.includes(jobId)) {
        return previous;
      }

      return [...previous, jobId];
    });
  }, []);


  // Remove saved job
  const removeSavedJob = useCallback((jobId) => {
    setSavedJobs((previous) =>
      previous.filter((id) => id !== jobId)
    );
  }, []);


  // Apply for job
  const applyJob = useCallback((application) => {

    setApplications((previous) => {

      const alreadyApplied = previous.some(
        (item) => item.jobId === application.jobId
      );

      if (alreadyApplied) {
        return previous;
      }

      return [
        ...previous,
        {
          ...application,
          id: Date.now(),
          status: "Submitted",
          appliedAt: new Date().toLocaleDateString()
        }
      ];
    });

  }, []);


  // Withdraw application
  const withdrawApplication = useCallback((applicationId) => {

    setApplications((previous) =>
      previous.filter(
        (application) =>
          application.id !== applicationId
      )
    );

  }, []);


  // Create job alert
  const createJobAlert = useCallback((alert) => {

    setJobAlerts((previous) => [
      ...previous,
      {
        ...alert,
        id: Date.now()
      }
    ]);

  }, []);


  // Saved-job count
  const savedJobCount = useMemo(
    () => savedJobs.length,
    [savedJobs]
  );


  // Application count
  const applicationCount = useMemo(
    () => applications.length,
    [applications]
  );


  // Application status summary
  const applicationStatusSummary = useMemo(() => {

    return applications.reduce(
      (summary, application) => {

        const status = application.status;

        summary[status] =
          (summary[status] || 0) + 1;

        return summary;

      },
      {}
    );

  }, [applications]);


  return {
    applications,
    savedJobs,
    jobAlerts,

    saveJob,
    removeSavedJob,
    applyJob,
    withdrawApplication,
    createJobAlert,

    savedJobCount,
    applicationCount,
    applicationStatusSummary
  };
}

export default useApplications;