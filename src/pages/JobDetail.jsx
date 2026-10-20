
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadJobDetails } from "../store/jobsSlice";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const job = useSelector(
    (state) => state.jobs.details[String(id)]
  );

  const loading = useSelector(
    (state) => state.jobs.detailsLoading[String(id)] ?? false
  );

  const error = useSelector(
    (state) => state.jobs.detailsErrors[String(id)] ?? ""
  );

  useEffect(() => {
    if (id) {
      dispatch(loadJobDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="job-not-found">
        <h2>Loading Job Details...</h2>
        <p>Please wait while we retrieve the job information.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-not-found">
        <h2>Unable to Load Job</h2>
        <p>{error}</p>

        <button onClick={() => dispatch(loadJobDetails(id))}>
          Try Again
        </button>

        <p>
          <Link to="/jobs">← Back to Jobs</Link>
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>
        <p>The requested job could not be found.</p>
        <Link to="/jobs">← Back to Jobs</Link>
      </div>
    );
  }

  const skills = Array.isArray(job.skills) ? job.skills : [];
  const description = job.description || "No description available.";
  const plainDescription = description.replace(/<[^>]*>/g, " ");

  return (
    <div className="job-detail-page">
      <section className="job-detail-hero">
        <div className="job-detail-company-logo">
          {(job.company || "C").charAt(0)}
        </div>

        <div className="job-detail-heading">
          <span>{job.industry || "Job Opportunity"}</span>
          <h1>{job.title}</h1>
          <p>{job.company}</p>

          <div className="job-detail-meta">
            <span>📍 {job.location || "Remote"}</span>
            <span>💼 {job.type || "Not specified"}</span>
            <span>💰 {job.salary || "Not specified"}</span>
          </div>
        </div>
      </section>

      <main className="job-detail-container">
        <div className="job-detail-main">
          <section className="detail-section">
            <h2>Job Description</h2>
            <p>{plainDescription}</p>

            {job.url && (
              <p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Original Job Posting ↗
                </a>
              </p>
            )}
          </section>

          <section className="detail-section">
            <h2>Required Skills</h2>

            {skills.length > 0 ? (
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={`${skill}-${index}`}>{skill}</span>
                ))}
              </div>
            ) : (
              <p>Skills were not specified in the API listing.</p>
            )}
          </section>

          <section className="detail-section">
            <h2>Experience & Job Type</h2>

            <div className="detail-info-grid">
              <div>
                <small>Experience Level</small>
                <strong>{job.experience || "Not specified"}</strong>
              </div>

              <div>
                <small>Job Type</small>
                <strong>{job.type || "Not specified"}</strong>
              </div>

              <div>
                <small>Industry</small>
                <strong>{job.industry || "Not specified"}</strong>
              </div>

              <div>
                <small>Location</small>
                <strong>{job.location || "Remote"}</strong>
              </div>
            </div>
          </section>
        </div>

        <aside className="application-card">
          <h2>Interested in this job?</h2>
          <p>
            Take the next step in your career and submit your application.
          </p>

          <button
            onClick={() => navigate(`/apply/${job.id ?? id}`)}
            className="apply-button"
          >
            Apply for this Job →
          </button>

          <Link to="/jobs" className="back-jobs-button">
            ← Back to Jobs
          </Link>
        </aside>
      </main>
    </div>
  );
}

export default JobDetail;
