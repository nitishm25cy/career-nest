import { Link } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

function DashboardHome() {
  const {
    applicationCount,
    savedJobCount,
    jobAlerts
  } = useJobContext();

  return (
    <div className="dashboard-overview">

      <h2>Welcome to your dashboard</h2>

      <p className="dashboard-description">
        Here's a quick overview of your CareerNest activity.
      </p>

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>Applications</span>
          <strong>{applicationCount}</strong>
          <Link to="/dashboard/applications">
            View Applications →
          </Link>
        </div>

        <div className="dashboard-stat-card">
          <span>Saved Jobs</span>
          <strong>{savedJobCount}</strong>
          <Link to="/dashboard/saved-jobs">
            View Saved Jobs →
          </Link>
        </div>

        <div className="dashboard-stat-card">
          <span>Job Alerts</span>
          <strong>{jobAlerts.length}</strong>
          <Link to="/dashboard/job-alerts">
            Manage Alerts →
          </Link>
        </div>

      </div>

      <div className="dashboard-welcome-card">

        <h3>Continue your job search</h3>

        <p>
          Explore new opportunities and find your next career move.
        </p>

        <Link
          to="/jobs"
          className="apply-button"
        >
          Explore Jobs →
        </Link>

      </div>

    </div>
  );
}

export default DashboardHome;