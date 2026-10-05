import { useState } from "react";
import { Link } from "react-router-dom";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  education: "",
  skills: "",
  experience: "",
  bio: ""
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("careerNestProfile");

      return saved
        ? { ...emptyProfile, ...JSON.parse(saved) }
        : emptyProfile;
    } catch (error) {
      return emptyProfile;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        "careerNestProfile",
        JSON.stringify(profile)
      );

      setSavedMessage("Profile saved successfully!");

      setTimeout(() => {
        setSavedMessage("");
      }, 3000);

    } catch (error) {
      setSavedMessage("Unable to save profile.");
      console.error("Profile save error:", error);
    }
  };

  return (
    <div className="profile-page">

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
            <Link to="/profile" className="active">
              Profile
            </Link>
          </nav>

        </div>
      </header>

      <section className="saved-jobs-header">

        <span className="hero-tag">
          CAREERNEST
        </span>

        <h1>My Profile</h1>

        <p>
          Keep your applicant information updated.
        </p>

      </section>

      <section className="profile-content">

        <div className="profile-card">

          <span className="results-label">
            APPLICANT PROFILE
          </span>

          <h2>Personal Information</h2>

          <form onSubmit={handleSubmit}>

            <div className="profile-form-grid">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                />
              </div>

              <div className="form-group">
                <label>Education</label>

                <input
                  type="text"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  placeholder="Enter your education"
                />
              </div>

              <div className="form-group">
                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  placeholder="e.g. Fresher"
                />
              </div>

            </div>

            <div className="form-group">
              <label>Skills</label>

              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="e.g. React, JavaScript, Java"
              />
            </div>

            <div className="form-group">
              <label>Professional Bio</label>

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell employers about yourself..."
                rows="5"
              />
            </div>

                <div className="profile-save-area">

                  <button
                    type="submit"
                    className="apply-button"
                  >
                    Save Profile →
                  </button>

                {savedMessage && (
                   <p className="profile-save-message">
                     ✓ {savedMessage}
                    </p>
                 )}

</div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Profile;