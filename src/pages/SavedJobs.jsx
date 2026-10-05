import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { useJobContext } from "../context/JobContext";

function SavedJobs() {
  const {
    jobs,
    savedJobs,
    removeSavedJob
  } = useJobContext();

  const savedJobList = jobs.filter((job) =>
    savedJobs.includes(job.id)
  );

  return (
    <div className="saved-jobs-page">

      {/* Header */}
      <header className="site-header">
        <div className="header-container">

          <Link to="/" className="logo">
            Career<span>Nest</span>
          </Link>

          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>

            <Link to="/saved-jobs" className="active">
              Saved Jobs
            </Link>

            <Link to="/applications">
              Applications
            </Link>

            <Link to="/alerts">
              Job Alerts
            </Link>
          </nav>

        </div>
      </header>

      {/* Page Header */}
      <section className="saved-jobs-header">

        <span className="hero-tag">
          CAREERNEST
        </span>

        <h1>
          Your Saved Jobs
        </h1>

        <p>
          Keep track of opportunities you are interested in.
        </p>

      </section>

      {/* Saved Jobs */}
      <section className="saved-jobs-content">

        <div className="saved-jobs-title">
          <div>
            <span className="results-label">
              YOUR COLLECTION
            </span>

            <h2>
              Saved Opportunities
            </h2>
          </div>

          <span className="job-count">
            {savedJobList.length} Saved
          </span>
        </div>

        {savedJobList.length === 0 ? (

          <div className="no-jobs">

            <h3>
              No saved jobs yet
            </h3>

            <p>
              Browse available jobs and save the ones
              you would like to explore later.
            </p>

            <Link
              to="/jobs"
              className="clear-filter-button"
            >
              Browse Jobs →
            </Link>

          </div>

        ) : (

          <div className="jobs-grid">

            {savedJobList.map((job) => (

              <JobCard
                key={job.id}
                job={job}
                saved={true}
                onSave={() => removeSavedJob(job.id)}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default SavedJobs;