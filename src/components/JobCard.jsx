import { Link } from "react-router-dom";

function JobCard({ job, saved, onSave }) {
  return (
    <div className="job-card">

      <div className="job-card-top">

        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <button
          className={`save-job ${saved ? "saved" : ""}`}
          onClick={() => onSave(job.id)}
        >
          {saved ? "♥" : "♡"}
        </button>

      </div>

      <div className="job-card-content">

        <span className="job-industry">
          {job.industry}
        </span>

        <h3>{job.title}</h3>

        <p className="company-name">
          {job.company}
        </p>

        <div className="job-meta">
          <span>📍 {job.location}</span>
          <span>💼 {job.type}</span>
        </div>

        <div className="job-meta">
          <span>💰 {job.salary}</span>
          <span>⌛ {job.experience}</span>
        </div>

      </div>

      <div className="job-card-bottom">

        <Link
          to={`/job/${job.id}`}
          className="view-job-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default JobCard;