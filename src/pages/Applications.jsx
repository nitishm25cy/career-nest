import { Link } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import ApplicationCard from "../components/ApplicationCard";

function Applications() {
  const { applications, withdrawApplication } = useJobContext();

  return (
    <div className="applications-page">
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
            <Link to="/profile">Profile</Link>
          </nav>
        </div>
      </header>

      <section className="saved-jobs-header">
        <div className="saved-jobs-header-inner">
          <span className="hero-tag">CAREERNEST</span>
          <h1>My Applications</h1>
          <p>
            Track the jobs you have applied for and manage your applications.
          </p>
        </div>
      </section>

      <section className="applications-content">
        <div className="applications-container">
          <div className="applications-title">
            <span className="results-label">APPLICATION MANAGEMENT</span>
            <h2>Your Applications</h2>
          </div>

          {applications.length === 0 ? (
            <div className="empty-state">
              <h3>No applications yet</h3>
              <p>
                You have not applied for any jobs yet. Explore available jobs
                and submit your first application.
              </p>

              <Link to="/jobs" className="apply-button">
                Explore Jobs →
              </Link>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onWithdraw={withdrawApplication}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Applications;