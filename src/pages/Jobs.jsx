import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import { useJobContext } from "../context/JobContext";

function Jobs() {
  const {
    filteredJobs,
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
    clearFilters
  } = useJobContext();

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      removeSavedJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  return (
    <div className="jobs-page">

      {/* Header */}
      <header className="site-header">
        <div className="header-container">

          <Link to="/" className="logo">
            Career<span>Nest</span>
          </Link>

          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/jobs" className="active">
              Jobs
            </Link>
            <Link to="/saved-jobs">Saved Jobs</Link>
            <Link to="/applications">Applications</Link>
            <Link to="/alerts">Job Alerts</Link>
          </nav>

        </div>
      </header>

      {/* Hero */}
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

      {/* Search */}
      <section className="job-search-section">
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </section>

      {/* Main Content */}
      <section className="jobs-content">

        {/* Filters */}
        <aside className="filter-sidebar">
          <FilterPanel
            location={location}
            setLocation={setLocation}
            industry={industry}
            setIndustry={setIndustry}
            experience={experience}
            setExperience={setExperience}
            type={type}
            setType={setType}
          />

          <button
            className="clear-filter-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </aside>

        {/* Jobs */}
        <main className="jobs-results">

          <div className="jobs-results-header">
            <div>
              <span className="results-label">
                CAREERNEST OPPORTUNITIES
              </span>

              <h2>
                Available Jobs
              </h2>
            </div>

            <span className="job-count">
              {filteredJobs.length} Jobs Found
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <h3>No jobs found</h3>

              <p>
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="clear-filter-button"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="jobs-grid">

              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={savedJobs.includes(job.id)}
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