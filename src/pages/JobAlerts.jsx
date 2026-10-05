import { useState } from "react";
import { Link } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import JobAlertCard from "../components/JobAlertCard";

function JobAlerts() {
  const { jobAlerts, createJobAlert } = useJobContext();

  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
    frequency: "Daily"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.keyword.trim()) {
      return;
    }

    createJobAlert(formData);

    setFormData({
      keyword: "",
      location: "",
      frequency: "Daily"
    });
  };

  return (
    <div className="alerts-page">
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
          <h1>Job Alerts</h1>
          <p>
            Create alerts and stay updated when new opportunities match your
            interests.
          </p>
        </div>
      </section>

      <section className="alerts-content">
        <div className="alerts-container">

          <div className="alert-form-card">
            <span className="results-label">CREATE JOB ALERT</span>
            <h2>Find opportunities automatically</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">

                <div className="form-group">
                  <label>Job Keyword</label>
                  <input
                    type="text"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleChange}
                    placeholder="e.g. React Developer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai"
                  />
                </div>

                <div className="form-group">
                  <label>Frequency</label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

              </div>

              <button type="submit" className="apply-button">
                Create Job Alert →
              </button>
            </form>
          </div>

          <div className="alerts-title">
            <span className="results-label">YOUR ALERTS</span>
            <h2>Active Job Alerts</h2>
          </div>

          {jobAlerts.length === 0 ? (
            <div className="empty-state">
              <h3>No job alerts created</h3>
              <p>
                Create your first alert above to receive matching job
                opportunities.
              </p>
            </div>
          ) : (
            <div className="alerts-list">
              {jobAlerts.map((alert) => (
                <JobAlertCard
                  key={alert.id}
                  alert={alert}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default JobAlerts;