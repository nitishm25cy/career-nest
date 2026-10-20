
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import { loadJobs } from "../store/jobsSlice";
import {
  removeSavedJobFromStore,
  loadSavedJobsFromApi,
} from "../store/savedJobsSlice";
import { removeSavedJobApi } from "../services/api";

function SavedJobs() {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs.items);
  const jobsLoading = useSelector((state) => state.jobs.loading);
  const savedJobs = useSelector((state) => state.savedJobs);

  const [loadingSaved, setLoadingSaved] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoadingSaved(true);
      setError("");

      try {
        await dispatch(loadJobs()).unwrap().catch((err) => {
          if (!jobs.length) throw err;
        });

        await dispatch(loadSavedJobsFromApi()).unwrap();
      } catch (err) {
        if (active) {
          setError(
            typeof err === "string"
              ? err
              : "Unable to load saved jobs. Please try again."
          );
        }
      } finally {
        if (active) setLoadingSaved(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [dispatch]);

  const savedJobList = jobs.filter((job) =>
    savedJobs.some((id) => String(id) === String(job.id))
  );

  const handleRemoveSavedJob = async (jobId) => {
    setRemovingId(String(jobId));
    setError("");

    try {
      await removeSavedJobApi(jobId);
      dispatch(removeSavedJobFromStore(jobId));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to remove this saved job. Please try again."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="saved-jobs-page">
      <section className="saved-jobs-header">
        <span className="hero-tag">CAREERNEST</span>
        <h1>Your Saved Jobs</h1>
        <p>Keep track of opportunities you are interested in.</p>
      </section>

      <section className="saved-jobs-content">
        <div className="saved-jobs-title">
          <div>
            <span className="results-label">YOUR COLLECTION</span>
            <h2>Saved Opportunities</h2>
          </div>

          {!loadingSaved && !error && (
            <span className="job-count">
              {savedJobList.length} Saved
            </span>
          )}
        </div>

        {loadingSaved && (
          <div className="no-jobs">
            <h3>Loading saved jobs...</h3>
            <p>Please wait while we retrieve your saved opportunities.</p>
          </div>
        )}

        {!loadingSaved && error && (
          <div className="no-jobs" role="alert">
            <h3>Unable to load saved jobs</h3>
            <p>{error}</p>
            <button
              className="clear-filter-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loadingSaved && !error && savedJobList.length === 0 && (
          <div className="no-jobs">
            <h3>No saved jobs yet</h3>
            <p>
              Browse available jobs and save the ones you would like
              to explore later.
            </p>
            <Link to="/jobs" className="clear-filter-button">
              Browse Jobs →
            </Link>
          </div>
        )}

        {!loadingSaved && !error && savedJobList.length > 0 && (
          <div className="jobs-grid">
            {savedJobList.map((job) => (
              <div key={job.id}>
                <JobCard
                  job={job}
                  saved={true}
                  onSave={() => handleRemoveSavedJob(job.id)}
                />

                {removingId === String(job.id) && (
                  <p role="status">Removing saved job...</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SavedJobs;
