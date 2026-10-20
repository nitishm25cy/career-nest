
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobAlertCard from "../components/JobAlertCard";
import {
  loadAlerts,
  addAlertAsync,
  clearAlertError,
} from "../store/alertsSlice";

function JobAlerts() {
  const dispatch = useDispatch();

  const {
    items: apiAlerts,
    loading,
    creating,
    error,
  } = useSelector((state) => state.alerts);

  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
    frequency: "Daily",
  });

  useEffect(() => {
    dispatch(loadAlerts());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.keyword.trim()) {
      return;
    }

    try {
      await dispatch(
        addAlertAsync({
          ...formData,
          keyword: formData.keyword.trim(),
          location: formData.location.trim(),
        })
      ).unwrap();

      setFormData({
        keyword: "",
        location: "",
        frequency: "Daily",
      });
    } catch (err) {
      console.error("Failed to create job alert:", err);
    }
  };

  const handleRetry = () => {
    dispatch(loadAlerts());
  };

  return (
    <div className="alerts-page">
      <section className="saved-jobs-header">
        <div className="saved-jobs-header-inner">
          <span className="hero-tag">CAREERNEST</span>
          <h1>Job Alerts</h1>
          <p>
            Create alerts and stay updated when new opportunities
            match your interests.
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
                  <label htmlFor="alert-keyword">Job Keyword</label>
                  <input
                    id="alert-keyword"
                    type="text"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleChange}
                    placeholder="e.g. React Developer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="alert-location">Location</label>
                  <input
                    id="alert-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="alert-frequency">Frequency</label>
                  <select
                    id="alert-frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
              </div>

              {error && (
                <p role="alert" className="error-message">
                  {error}
                  <button
                    type="button"
                    onClick={() => dispatch(clearAlertError())}
                  >
                    Dismiss
                  </button>
                </p>
              )}

              <button
                type="submit"
                className="apply-button"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create Job Alert →"}
              </button>
            </form>
          </div>

          <div className="alerts-title">
            <span className="results-label">YOUR ALERTS</span>
            <h2>Active Job Alerts</h2>
          </div>

          {loading && (
            <div className="empty-state">
              <h3>Loading job alerts...</h3>
              <p>Please wait while we retrieve your alerts.</p>
            </div>
          )}

          {!loading && error && (
            <div className="empty-state">
              <h3>Unable to load alerts or complete the request</h3>
              <p role="alert">{error}</p>
              <button
                type="button"
                className="apply-button"
                onClick={handleRetry}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && apiAlerts.length === 0 && (
            <div className="empty-state">
              <h3>No job alerts created</h3>
              <p>
                Create your first alert above to keep track of matching
                job opportunities.
              </p>
            </div>
          )}

          {!loading && !error && apiAlerts.length > 0 && (
            <div className="alerts-list">
              {apiAlerts.map((alert, index) => (
                <JobAlertCard
                  key={alert.id ?? `${alert.keyword}-${index}`}
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

