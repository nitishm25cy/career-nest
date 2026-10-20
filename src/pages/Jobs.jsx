
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadJobs } from "../store/jobsSlice";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import { useJobContext } from "../context/JobContext";

import {
  saveJobToStore,
  removeSavedJobFromStore,
} from "../store/savedJobsSlice";

import {
  saveJobApi,
  removeSavedJobApi,
} from "../services/api";

function Jobs() {
  const {
    keyword,
    setKeyword,
    location,
    setLocation,
    industry,
    setIndustry,
    experience,
    setExperience,
    type,
    setType,
    savedJobs,
    saveJob,
    removeSavedJob,
    clearFilters,
  } = useJobContext();

  const dispatch = useDispatch();

  const {
    items: apiJobs = [],
    loading,
    error,
  } = useSelector((state) => state.jobs);

  const [salary, setSalary] = useState("");
  const [savingJobId, setSavingJobId] = useState(null);
  const [saveError, setSaveError] = useState("");

  // Load jobs when the list is empty and no request is running.
  useEffect(() => {
    if (apiJobs.length === 0 && !loading && !error) {
      dispatch(loadJobs());
    }
  }, [dispatch, apiJobs.length, loading, error]);

  // Normalize search values once per filter change.
  const normalizedFilters = useMemo(
    () => ({
      keyword: (keyword || "").trim().toLowerCase(),
      location: (location || "").trim().toLowerCase(),
      industry: (industry || "").trim().toLowerCase(),
      experience: (experience || "").trim().toLowerCase(),
      type: (type || "").trim().toLowerCase(),
      salary,
    }),
    [keyword, location, industry, experience, type, salary]
  );

  // Calculate filtered results only when jobs or filters change.
  const filteredJobs = useMemo(() => {
    return apiJobs.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const company = (job.company || "").toLowerCase();
      const jobLocation = (job.location || "").toLowerCase();
      const jobIndustry = (job.industry || "").toLowerCase();
      const jobType = (job.type || "").toLowerCase();
      const jobExperience = (job.experience || "").toLowerCase();

      const salaryValue = Number(
        String(job.salary || "").replace(/[^0-9.]/g, "")
      );

      const matchesKeyword =
        !normalizedFilters.keyword ||
        title.includes(normalizedFilters.keyword) ||
        company.includes(normalizedFilters.keyword);

      const matchesLocation =
        !normalizedFilters.location ||
        jobLocation.includes(normalizedFilters.location);

      const matchesIndustry =
        !normalizedFilters.industry ||
        jobIndustry.includes(normalizedFilters.industry);

      const matchesType =
        !normalizedFilters.type ||
        jobType.includes(normalizedFilters.type);

      const matchesExperience =
        !normalizedFilters.experience ||
        jobExperience.includes(normalizedFilters.experience);

      const matchesSalary =
        !normalizedFilters.salary ||
        (String(job.salary || "").trim() !== "" &&
          Number.isFinite(salaryValue) &&
          ((normalizedFilters.salary === "below-50000" &&
            salaryValue < 50000) ||
            (normalizedFilters.salary === "50000-100000" &&
              salaryValue >= 50000 &&
              salaryValue <= 100000) ||
            (normalizedFilters.salary === "above-100000" &&
              salaryValue > 100000)));

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesIndustry &&
        matchesType &&
        matchesExperience &&
        matchesSalary
      );
    });
  }, [apiJobs, normalizedFilters]);

  // Stable callback for job save/remove actions.
  const toggleSaveJob = useCallback(
    async (jobId) => {
      if (savingJobId !== null) return;

      const isSaved = savedJobs.some(
        (id) => String(id) === String(jobId)
      );

      setSavingJobId(String(jobId));
      setSaveError("");

      try {
        if (isSaved) {
          await removeSavedJobApi(jobId);
          removeSavedJob(jobId);
          dispatch(removeSavedJobFromStore(jobId));
        } else {
          await saveJobApi(jobId);
          saveJob(jobId);
          dispatch(saveJobToStore(jobId));
        }
      } catch (err) {
        setSaveError(
          err.response?.data?.message ||
            "Unable to update saved jobs. Please try again."
        );
      } finally {
        setSavingJobId(null);
      }
    },
    [savingJobId, savedJobs, removeSavedJob, saveJob, dispatch]
  );

  const handleClearFilters = useCallback(() => {
    clearFilters();
    setSalary("");
  }, [clearFilters]);

  const retryLoadJobs = useCallback(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  return (
    <div className="jobs-page">
      <section className="jobs-hero">
        <div className="jobs-hero-content">
          <span className="hero-tag">CAREERNEST JOBS</span>
          <h1>
            Find a Job That
            <br />
            <span>Fits Your Future</span>
          </h1>
          <p>
            Explore opportunities from companies looking for talented
            people like you.
          </p>
        </div>
      </section>

      <section
        className="job-search-section"
        aria-label="Search job opportunities"
      >
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </section>

      <section className="jobs-content">
        {saveError && (
          <div className="no-jobs" role="alert">
            <p>{saveError}</p>
          </div>
        )}

        <aside className="filter-sidebar" aria-label="Job filters">
          <FilterPanel
            location={location}
            setLocation={setLocation}
            industry={industry}
            setIndustry={setIndustry}
            experience={experience}
            setExperience={setExperience}
            type={type}
            setType={setType}
            salary={salary}
            setSalary={setSalary}
          />

          <button
            type="button"
            className="clear-filter-button"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </aside>

        <main className="jobs-results" aria-busy={loading}>
          <div className="jobs-results-header">
            <div>
              <span className="results-label">
                CAREERNEST OPPORTUNITIES
              </span>
              <h2>Available Jobs</h2>
            </div>

            {!loading && !error && (
              <span className="job-count" aria-live="polite">
                {filteredJobs.length} Jobs Found
              </span>
            )}
          </div>

          {loading && (
            <div className="no-jobs" role="status" aria-live="polite">
              <h3>Loading jobs...</h3>
              <p>Please wait while we retrieve job listings.</p>
            </div>
          )}

          {!loading && error && (
            <div className="no-jobs" role="alert">
              <h3>Unable to load jobs</h3>
              <p>{error}</p>
              <button
                type="button"
                className="clear-filter-button"
                onClick={retryLoadJobs}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredJobs.length === 0 && (
            <div className="no-jobs">
              <h3>No jobs found</h3>
              <p>Try changing your search or filters.</p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="clear-filter-button"
              >
                Reset Filters
              </button>
            </div>
          )}

          {!loading && !error && filteredJobs.length > 0 && (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={savedJobs.some(
                    (id) => String(id) === String(job.id)
                  )}
                  onSave={toggleSaveJob}
                />
              ))}
            </div>
          )}
        </main>
      </section>
    </div>
  );
}

export default Jobs;
