
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../store/profileSlice";

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const [savedMessage, setSavedMessage] = useState("");

  // Update profile fields in Redux
  const handleChange = (event) => {
    const { name, value } = event.target;

    dispatch(updateProfile({ [name]: value }));
    setSavedMessage("");
  };

  // Save confirmation
  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // Redux middleware saves profile changes to localStorage.
      dispatch(updateProfile({ ...profile }));

      setSavedMessage("Profile saved successfully!");

      setTimeout(() => {
        setSavedMessage("");
      }, 3000);
    } catch (error) {
      setSavedMessage("Unable to save profile.");
      console.error("Profile save error:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <section className="saved-jobs-header">
        <span className="hero-tag">CAREERNEST</span>
        <h1>My Profile</h1>
        <p>Keep your applicant information updated.</p>
      </section>

      <section className="profile-content">
        <div className="profile-card">
          <span className="results-label">APPLICANT PROFILE</span>
          <h2>Personal Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="profile-form-grid">
              <div className="form-group">
                <label htmlFor="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-email">Email</label>
                <input
                  id="profile-email"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-phone">Phone</label>
                <input
                  id="profile-phone"
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-location">Location</label>
                <input
                  id="profile-location"
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-education">Education</label>
                <input
                  id="profile-education"
                  type="text"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  placeholder="Enter your education"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-experience">Experience</label>
                <input
                  id="profile-experience"
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  placeholder="e.g. Fresher"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="profile-skills">Skills</label>
              <input
                id="profile-skills"
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="e.g. React, JavaScript, Java"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-bio">Professional Bio</label>
              <textarea
                id="profile-bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell employers about yourself..."
                rows={5}
              />
            </div>

            <div className="profile-save-area">
              <button type="submit" className="apply-button">
                Save Profile →
              </button>

              {savedMessage && (
                <p
                  className="profile-save-message"
                  role="status"
                >
                  {savedMessage}
                </p>
              )}
            </div>

            <div className="profile-logout-area">
              <button
                type="button"
                className="profile-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Profile;
