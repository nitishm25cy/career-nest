import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* Main CareerNest Header */}
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

  

            <Link to="/dashboard/profile">
              Profile
            </Link> 

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </nav>

        </div>
      </header>

      {/* Dashboard Area */}
      <section className="dashboard-container">

        <div className="dashboard-heading">

          <span className="hero-tag">
            CAREERNEST DASHBOARD
          </span>

          <h1>Applicant Dashboard</h1>

          <p>
            Welcome back{user?.name ? `, ${user.name}` : ""}.
            Manage your applications, saved jobs, alerts and profile
            from one place.
          </p>

        </div>

        <div className="dashboard-layout">

          {/* Sidebar */}
          <aside className="dashboard-sidebar">

            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "dashboard-link active"
                  : "dashboard-link"
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="/dashboard/applications"
              className={({ isActive }) =>
                isActive
                  ? "dashboard-link active"
                  : "dashboard-link"
              }
            >
              Applications
            </NavLink>

            <NavLink
              to="/dashboard/saved-jobs"
              className={({ isActive }) =>
                isActive
                  ? "dashboard-link active"
                  : "dashboard-link"
              }
            >
              Saved Jobs
            </NavLink>

            <NavLink
              to="/dashboard/job-alerts"
              className={({ isActive }) =>
                isActive
                  ? "dashboard-link active"
                  : "dashboard-link"
              }
            >
              Job Alerts
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? "dashboard-link active"
                  : "dashboard-link"
              }
            >
              Profile
            </NavLink>

          </aside>

          {/* Nested pages appear here */}
          <main className="dashboard-main">
            <Outlet />
          </main>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;