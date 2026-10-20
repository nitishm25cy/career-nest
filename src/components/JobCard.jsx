import { Link } from "react-router-dom";

function JobCard({ job, saved, onSave }) {
  return (
    <article className="job-card">

      {/* Top section */}
      <div className="job-card-top">

        <div className="company-logo">
          {job.company?.charAt(0)}
        </div>

        <button
          type="button"
          className={`save-job-button ${saved ? "saved" : ""}`}
          onClick={() => onSave(job.id)}
          aria-label={saved ? "Remove saved job" : "Save job"}
        >
          {saved ? "♥" : "♡"}
        </button>

      </div>

      {/* Industry */}
      <span className="job-industry">
        {job.industry}
      </span>

      {/* Job title */}
      <h3 className="job-title">
        {job.title}
      </h3>

      {/* Company */}
      <p className="job-company">
        {job.company}
      </p>

      {/* Job information */}
      <div className="job-info">

        <span>
          📍 {job.location}
        </span>

        <span>
          💼 {job.type}
        </span>

        <span>
          💰 {job.salary}
        </span>

        <span>
          ⏳ {job.experience}
        </span>

      </div>

      {/* Button */}
      <div className="job-card-footer">

        <Link
          to={`/job/${job.id}`}
          className="view-details-button"
        >
          View Details
          <span>→</span>
        </Link>

      </div>

    </article>
  );
}

export default JobCard;