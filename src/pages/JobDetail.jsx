import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jobsData from "../data/jobs";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob = jobsData.find(
      (item) => item.id === Number(id)
    );

    setJob(selectedJob);
  }, [id]);

  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>

        <p>
          The job you're looking for does not exist.
        </p>

        <Link to="/jobs">
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="job-detail-page">

      {/* HEADER */}
      <header className="jobs-header">

        <Link to="/" className="logo">
          <span>Career</span>Nest
        </Link>

        <nav>
          <Link to="/">Home</Link>

          <Link to="/jobs">
            Find Jobs
          </Link>

          <Link to="/saved-jobs">
            Saved Jobs
          </Link>

          <Link to="/applications">
            Applications
          </Link>

          <Link to="/alerts">
            Job Alerts
          </Link>
        </nav>

        <Link
          to="/profile"
          className="profile-button"
        >
          Profile
        </Link>

      </header>


      {/* JOB HEADER */}
      <section className="job-detail-hero">

        <div className="job-detail-company-logo">
          {job.company.charAt(0)}
        </div>

        <div className="job-detail-heading">

          <span>
            {job.industry}
          </span>

          <h1>
            {job.title}
          </h1>

          <p>
            {job.company}
          </p>

          <div className="job-detail-meta">

            <span>
              📍 {job.location}
            </span>

            <span>
              💼 {job.type}
            </span>

            <span>
              💰 {job.salary}
            </span>

          </div>

        </div>

      </section>


      {/* CONTENT */}
      <main className="job-detail-container">

        <div className="job-detail-main">

          {/* DESCRIPTION */}
          <section className="detail-section">

            <h2>
              Job Description
            </h2>

            <p>
              {job.description}
            </p>

            <p>
              We are looking for a talented professional to join
              our team and contribute to exciting projects.
              The successful candidate will work with a
              collaborative team and have opportunities to
              develop their technical and professional skills.
            </p>

          </section>


          {/* REQUIREMENTS */}
          <section className="detail-section">

            <h2>
              Required Skills
            </h2>

            <div className="skills-list">

              {job.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}

            </div>

          </section>


          {/* EXPERIENCE */}
          <section className="detail-section">

            <h2>
              Experience & Job Type
            </h2>

            <div className="detail-info-grid">

              <div>
                <small>
                  Experience Level
                </small>

                <strong>
                  {job.experience}
                </strong>
              </div>

              <div>
                <small>
                  Job Type
                </small>

                <strong>
                  {job.type}
                </strong>
              </div>

              <div>
                <small>
                  Industry
                </small>

                <strong>
                  {job.industry}
                </strong>
              </div>

              <div>
                <small>
                  Location
                </small>

                <strong>
                  {job.location}
                </strong>
              </div>

            </div>

          </section>

        </div>


        {/* SIDE CARD */}
        <aside className="application-card">

          <h2>
            Interested in this job?
          </h2>

          <p>
            Take the next step in your career and submit
            your application.
          </p>

          <button
            onClick={() => navigate(`/apply/${job.id}`)}
            className="apply-button"
          >
            Apply for this Job →
          </button>

          <Link
            to="/jobs"
            className="back-jobs-button"
          >
            ← Back to Jobs
          </Link>

        </aside>

      </main>

    </div>
  );
}

export default JobDetail;