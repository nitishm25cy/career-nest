
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useJobContext } from "../context/JobContext";
import { submitApplication } from "../store/applicationsSlice";

function ApplicationReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applyJob } = useJobContext();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const application = location.state;

  // Check whether application data exists
  if (!application || !application.job || !application.applicant) {
    return (
      <div className="no-jobs">
        <h2>Application information not found</h2>

        <p>Please go back and apply for a job again.</p>

        <Link to="/jobs" className="clear-filter-button">
          Browse Jobs →
        </Link>
      </div>
    );
  }

  const { job, applicant } = application;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");

      // Submit through Redux; Redux calls the backend API
      const savedApplication = await dispatch(
        submitApplication({
          jobId: String(job.id),
          job,
          applicant,
        })
      ).unwrap();

      // Keep the existing JobContext synchronized
      applyJob({
        ...savedApplication,
        jobId: String(job.id),
        job,
        applicant,
      });

      navigate(`/application-confirmation/${job.id}`, {
        state: {
          job,
          applicant,
          application: savedApplication,
        },
      });
    } catch (err) {
      console.error("Application submission failed:", err);

      setError(
        "Unable to submit your application. Please check that the backend is running and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="application-review-page">
      <section className="application-review-container">
        <span className="hero-tag">CAREERNEST</span>

        <h1>Review Your Application</h1>

        <p className="review-subtitle">
          Please check your information before submitting.
        </p>

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

        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}

        <div className="review-actions">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
            disabled={submitting}
          >
            ← Edit Application
          </button>

          <button
            type="button"
            className="apply-button"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Application →"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ApplicationReview;
