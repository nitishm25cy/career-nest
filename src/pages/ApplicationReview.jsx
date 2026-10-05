import { Link, useLocation, useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

function ApplicationReview() {
  const location = useLocation();
  const navigate = useNavigate();

  const { applyJob } = useJobContext();

  const application = location.state;

  // If the page is opened directly without application data
  if (!application || !application.job || !application.applicant) {
    return (
      <div className="no-jobs">
        <h2>Application information not found</h2>

        <p>
          Please go back and apply for a job again.
        </p>

        <Link to="/jobs" className="clear-filter-button">
          Browse Jobs →
        </Link>
      </div>
    );
  }

  const { job, applicant } = application;

  const handleSubmit = () => {
    applyJob({
      jobId: job.id,
      job: job,
      applicant: applicant
    });

    navigate(`/application-confirmation/${job.id}`, {
      state: {
        job: job,
        applicant: applicant
      }
    });
  };

  return (
    <div className="application-review-page">

      {/* Header */}
      <header className="site-header">
        <div className="header-container">

          <Link to="/" className="logo">
            Career<span>Nest</span>
          </Link>

          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/saved-jobs">Saved Jobs</Link>
            <Link to="/applications">Applications</Link>
            <Link to="/alerts">Job Alerts</Link>
          </nav>

        </div>
      </header>

      {/* Review */}
      <section className="application-review-container">

        <span className="hero-tag">
          CAREERNEST
        </span>

        <h1>Review Your Application</h1>

        <p className="review-subtitle">
          Please check your information before submitting.
        </p>

        {/* Job Information */}
        <div className="review-card">

          <h2>Job Details</h2>

          <div className="review-item">
            <strong>Job Title</strong>
            <span>{job.title}</span>
          </div>

          <div className="review-item">
            <strong>Company</strong>
            <span>{job.company}</span>
          </div>

          <div className="review-item">
            <strong>Location</strong>
            <span>{job.location}</span>
          </div>

        </div>

        {/* Applicant Information */}
        <div className="review-card">

          <h2>Applicant Details</h2>

          <div className="review-item">
            <strong>Name</strong>
            <span>{applicant.name}</span>
          </div>

          <div className="review-item">
            <strong>Email</strong>
            <span>{applicant.email}</span>
          </div>

          <div className="review-item">
            <strong>Phone</strong>
            <span>{applicant.phone}</span>
          </div>

          <div className="review-item">
            <strong>Experience</strong>
            <span>{applicant.experience}</span>
          </div>

          <div className="review-item">
            <strong>Resume</strong>
            <span>{applicant.resume}</span>
          </div>

          <div className="review-item">
            <strong>Cover Letter</strong>
            <span>{applicant.coverLetter}</span>
          </div>

        </div>

        {/* Buttons */}
        <div className="review-actions">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Edit Application
          </button>

          <button
            type="button"
            className="apply-button"
            onClick={handleSubmit}
          >
            Submit Application →
          </button>

        </div>

      </section>

    </div>
  );
}

export default ApplicationReview;