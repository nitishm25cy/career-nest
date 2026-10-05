import { Link, useLocation } from "react-router-dom";

function ApplicationConfirmation() {
  const location = useLocation();

  const application = location.state;

  if (!application) {
    return (
      <div className="job-not-found">

        <h2>Application information unavailable</h2>

        <p>
          Please return to the jobs page.
        </p>

        <Link to="/jobs">
          ← Browse Jobs
        </Link>

      </div>
    );
  }

  const { job, applicant } = application;

  return (
    <div className="confirmation-page">

      <header className="jobs-header">

        <Link to="/" className="logo">
          <span>Career</span>Nest
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/saved-jobs">Saved Jobs</Link>
          <Link to="/applications">Applications</Link>
          <Link to="/alerts">Job Alerts</Link>
        </nav>

        <Link to="/profile" className="profile-button">
          Profile
        </Link>

      </header>


      <main className="confirmation-container">

        <div className="confirmation-icon">
          ✓
        </div>

        <span className="confirmation-label">
          APPLICATION SUBMITTED
        </span>

        <h1>
          Application successfully submitted!
        </h1>

        <p className="confirmation-message">
          Your application for the
          <strong> {job.title} </strong>
          position at
          <strong> {job.company} </strong>
          has been submitted successfully.
        </p>


        <section className="confirmation-card">

          <div className="confirmation-job">

            <div className="review-company-logo">
              {job.company.charAt(0)}
            </div>

            <div>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
            </div>

          </div>


          <div className="confirmation-details">

            <div>
              <small>Applicant</small>
              <strong>{applicant.name}</strong>
            </div>

            <div>
              <small>Email</small>
              <strong>{applicant.email}</strong>
            </div>

            <div>
              <small>Location</small>
              <strong>{job.location}</strong>
            </div>

            <div>
              <small>Status</small>
              <strong className="submitted-status">
                Submitted
              </strong>
            </div>

          </div>

        </section>


        <div className="confirmation-actions">

          <Link
            to="/applications"
            className="primary-confirmation-button"
          >
            View My Applications
          </Link>

          <Link
            to="/jobs"
            className="secondary-confirmation-button"
          >
            Browse More Jobs
          </Link>

        </div>

      </main>

    </div>
  );
}

export default ApplicationConfirmation;