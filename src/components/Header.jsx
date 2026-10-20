import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header global-header">
      <div className="header-container">
        <Link to="/" className="logo">
          Career<span>Nest</span>
        </Link>

        <nav className="main-nav">
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className={
              location.pathname.startsWith("/jobs") ? "active" : ""
            }
          >
            Jobs
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/saved-jobs"
                className={
                  location.pathname === "/saved-jobs"
                    ? "active"
                    : ""
                }
              >
                Saved Jobs
              </Link>

              <Link
                to="/applications"
                className={
                  location.pathname === "/applications"
                    ? "active"
                    : ""
                }
              >
                Applications
              </Link>

              <Link
                to="/alerts"
                className={
                  location.pathname === "/alerts"
                    ? "active"
                    : ""
                }
              >
                Job Alerts
              </Link>

              <Link
                to="/dashboard"
                className={
                  location.pathname.startsWith("/dashboard")
                    ? "active"
                    : ""
                }
              >
                Dashboard
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="header-login">
                Login
              </Link>

              <Link to="/signup" className="header-signup">
                Sign Up
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button
              type="button"
              className="header-logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;