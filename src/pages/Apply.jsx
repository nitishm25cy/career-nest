import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jobsData from "../data/jobs";

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resume: "",
    coverLetter: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const selectedJob = jobsData.find(
      (item) => item.id === Number(id)
    );

    setJob(selectedJob);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Applicant name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain 10 digits.";
    }

    if (!formData.experience) {
      newErrors.experience =
        "Please select your experience.";
    }

    if (!formData.resume.trim()) {
      newErrors.resume =
        "Resume information is required.";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter =
        "Cover letter is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate(`/application-review/${job.id}`, {
      state: {
        job,
        applicant: formData
      }
    });
  };

  if (!job) {
    return (
      <div className="job-not-found">

        <h2>Job Not Found</h2>

        <p>
          We couldn't find the job you're applying for.
        </p>

        <Link to="/jobs">
          ← Back to Jobs
        </Link>

      </div>
    );
  }

  return (
    <div className="apply-page">

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


      {/* PAGE HEADER */}

      <section className="apply-hero">

        <span>JOB APPLICATION</span>

        <h1>
          Apply for this opportunity
        </h1>

        <p>
          Complete your application carefully before
          submitting it to the employer.
        </p>

      </section>


      {/* APPLICATION AREA */}

      <main className="apply-container">

        {/* JOB SUMMARY */}

        <aside className="application-job-card">

          <div className="company-logo large">
            {job.company.charAt(0)}
          </div>

          <span className="job-industry">
            {job.industry}
          </span>

          <h2>
            {job.title}
          </h2>

          <p className="company-name">
            {job.company}
          </p>

          <div className="application-job-info">

            <span>
              📍 {job.location}
            </span>

            <span>
              💰 {job.salary}
            </span>

            <span>
              💼 {job.type}
            </span>

            <span>
              ⌛ {job.experience}
            </span>

          </div>

        </aside>


        {/* FORM */}

        <section className="application-form-card">

          <div className="form-heading">

            <span>STEP 1 OF 2</span>

            <h2>
              Applicant Information
            </h2>

            <p>
              Enter your details and application information.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              {errors.name && (
                <small className="form-error">
                  {errors.name}
                </small>
              )}

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />

              {errors.email && (
                <small className="form-error">
                  {errors.email}
                </small>
              )}

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
              />

              {errors.phone && (
                <small className="form-error">
                  {errors.phone}
                </small>
              )}

            </div>


            {/* EXPERIENCE */}

            <div className="form-group">

              <label>
                Experience *
              </label>

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">
                  Select experience
                </option>

                <option value="Fresher">
                  Fresher
                </option>

                <option value="0–2 Years">
                  0–2 Years
                </option>

                <option value="1–3 Years">
                  1–3 Years
                </option>

                <option value="2–5 Years">
                  2–5 Years
                </option>

                <option value="5+ Years">
                  5+ Years
                </option>

              </select>

              {errors.experience && (
                <small className="form-error">
                  {errors.experience}
                </small>
              )}

            </div>


            {/* RESUME */}

            <div className="form-group">

              <label>
                Resume *
              </label>

              <input
                type="text"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Enter resume file name or link"
              />

              {errors.resume && (
                <small className="form-error">
                  {errors.resume}
                </small>
              )}

            </div>


            {/* COVER LETTER */}

            <div className="form-group">

              <label>
                Cover Letter *
              </label>

              <textarea
                name="coverLetter"
                rows="6"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Write a short cover letter..."
              />

              {errors.coverLetter && (
                <small className="form-error">
                  {errors.coverLetter}
                </small>
              )}

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <Link
                to={`/job/${job.id}`}
                className="cancel-button"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="continue-button"
              >
                Continue to Review →
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}

export default Apply;