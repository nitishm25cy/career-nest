import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">

            <div className="hero-badge">
              ✦ Your career journey starts here
            </div>

            <h1>
              Find a career
              <br />
              <span>you'll love.</span>
            </h1>

            <p>
              Discover meaningful opportunities, connect with leading
              companies, and take the next step toward your professional
              future.
            </p>

            <div className="hero-buttons">
              <Link to="/jobs" className="primary-btn">
                Explore Jobs →
              </Link>

              <Link to="/signup" className="secondary-btn">
                Create Account
              </Link>
            </div>
          </div>

          {/* Hero Job Preview */}
          <div className="hero-card">

            <div className="floating-card top-card">
              <span className="card-icon">💼</span>

              <div>
                <strong>12,500+</strong>
                <small>Jobs available</small>
              </div>
            </div>

            <div className="main-job-card">
              <div className="company-icon">
                G
              </div>

              <div className="job-info">
                <h3>Software Developer</h3>
                <p>Global Technologies</p>

                <div className="job-details">
                  <span>📍 Chennai</span>
                  <span>💰 ₹8–12 LPA</span>
                </div>
              </div>

              <div className="save-icon">
                ♡
              </div>
            </div>

            <div className="floating-card bottom-card">
              <span className="success-icon">✓</span>

              <div>
                <strong>Career progress</strong>
                <small>Application submitted</small>
              </div>
            </div>

          </div>
        </section>

        {/* Statistics */}
        <section className="stats-section">
          <div>
            <strong>12K+</strong>
            <span>Active Jobs</span>
          </div>

          <div>
            <strong>5K+</strong>
            <span>Companies</span>
          </div>

          <div>
            <strong>25K+</strong>
            <span>Job Seekers</span>
          </div>

          <div>
            <strong>98%</strong>
            <span>User Satisfaction</span>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">

          <div className="section-heading">
            <span>WHY CAREERNEST</span>

            <h2>
              Everything you need for your
              <br />
              next career move.
            </h2>
          </div>

          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">🔎</div>

              <h3>Smart Job Search</h3>

              <p>
                Find opportunities using powerful search and filtering
                options.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">♡</div>

              <h3>Save Opportunities</h3>

              <p>
                Keep interesting jobs organized and easily accessible.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📄</div>

              <h3>Easy Applications</h3>

              <p>
                Apply for jobs through a simple and organized application
                process.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔔</div>

              <h3>Job Alerts</h3>

              <p>
                Stay updated when new opportunities match your interests.
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          <div className="logo">
            <span>Career</span>Nest
          </div>

          <p>
            Connecting talent with opportunity.
          </p>
        </div>

        <div className="footer-links">
          <span>© 2026 CareerNest</span>
          <span>Job Portal Application</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;