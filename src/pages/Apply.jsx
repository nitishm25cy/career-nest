
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobById } from "../services/api";

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loadError, setLoadError] = useState(false);

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
    let active = true;

    async function loadJob() {
      setJob(null);
      setLoadError(false);

      try {
        const selectedJob = await fetchJobById(id);

        if (active) {
          if (selectedJob) {
            setJob(selectedJob);
          } else {
            setLoadError(true);
          }
        }
      } catch (error) {
        console.error("Failed to load job:", error);

        if (active) {
          setLoadError(true);
        }
      }
    }

    loadJob();

    return () => {
      active = false;
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

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
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must contain 10 digits.";
    }

    if (!formData.experience) {
      newErrors.experience = "Please select your experience.";
    }

    if (!formData.resume.trim()) {
      newErrors.resume = "Resume information is required.";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidField = Object.keys(validationErrors)[0];
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    if (!job) return;

    navigate(`/application-review/${job.id}`, {
      state: {
        job,
        applicant: {
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          resume: formData.resume.trim(),
          coverLetter: formData.coverLetter.trim()
        }
      }
    });
  };

  if (loadError) {
    return (
      <main className="job-not-found" aria-labelledby="not-found-heading">
        <h2 id="not-found-heading">Job Not Found</h2>
        <p>We couldn't find the job you're applying for.</p>
        <Link to="/jobs">← Back to Jobs</Link>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="apply-container" role="status" aria-live="polite">
        Loading job details...
      </main>
    );
  }

  const fieldError = (name) =>
    errors[name] ? `${name}-error` : undefined;

  return (
    <div className="apply-page">
      <section className="apply-hero" aria-labelledby="apply-heading">
        <span>JOB APPLICATION</span>
        <h1 id="apply-heading">Apply for this opportunity</h1>
        <p>
          Complete your application carefully before submitting it
          to the employer.
        </p>
      </section>

      <main className="apply-container">
        <aside
          className="application-job-card"
          aria-labelledby="application-job-title"
        >
          <div className="company-logo large" aria-hidden="true">
            {job.company.charAt(0)}
          </div>

          <span className="job-industry">{job.industry}</span>
          <h2 id="application-job-title">{job.title}</h2>
          <p className="company-name">{job.company}</p>

          <div className="application-job-info">
            <span>📍 {job.location}</span>
            <span>💰 {job.salary}</span>
            <span>💼 {job.type}</span>
            <span>⌛ {job.experience}</span>
          </div>
        </aside>

        <section
          className="application-form-card"
          aria-labelledby="applicant-info-heading"
        >
          <div className="form-heading">
            <span>STEP 1 OF 2</span>
            <h2 id="applicant-info-heading">Applicant Information</h2>
            <p>Enter your details and application information.</p>
          </div>

          {Object.keys(errors).some((key) => errors[key]) && (
            <div className="auth-error" role="alert" aria-live="assertive">
              Please correct the errors in the form before continuing.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={fieldError("name")}
              />
              {errors.name && (
                <small id="name-error" className="form-error">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={fieldError("email")}
              />
              {errors.email && (
                <small id="email-error" className="form-error">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                required
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={fieldError("phone")}
              />
              {errors.phone && (
                <small id="phone-error" className="form-error">
                  {errors.phone}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.experience)}
                aria-describedby={fieldError("experience")}
              >
                <option value="">Select experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0–2 Years">0–2 Years</option>
                <option value="1–3 Years">1–3 Years</option>
                <option value="2–5 Years">2–5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
              {errors.experience && (
                <small id="experience-error" className="form-error">
                  {errors.experience}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume *</label>
              <input
                id="resume"
                type="text"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Enter resume file name or link"
                required
                aria-invalid={Boolean(errors.resume)}
                aria-describedby={fieldError("resume")}
              />
              {errors.resume && (
                <small id="resume-error" className="form-error">
                  {errors.resume}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Write a short cover letter..."
                required
                aria-invalid={Boolean(errors.coverLetter)}
                aria-describedby={fieldError("coverLetter")}
              />
              {errors.coverLetter && (
                <small id="coverLetter-error" className="form-error">
                  {errors.coverLetter}
                </small>
              )}
            </div>

            <div className="form-actions">
              <Link to={`/job/${job.id}`} className="cancel-button">
                Cancel
              </Link>

              <button type="submit" className="continue-button">
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
