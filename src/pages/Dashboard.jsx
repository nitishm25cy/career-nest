
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJobContext } from "../context/JobContext";

function Dashboard() {
  const { user } = useAuth();

  const {
    applicationCount,
    savedJobCount,
    jobAlerts
  } = useJobContext();

  const dashboardLinks = [
    {
      to: "/dashboard",
      label: "Overview",
      icon: "⌂",
      end: true
    },
    {
      to: "/dashboard/applications",
      label: "My Applications",
      icon: "▤"
    },
    {
      to: "/dashboard/saved-jobs",
      label: "Saved Jobs",
      icon: "♡"
    },
    {
      to: "/dashboard/job-alerts",
      label: "Job Alerts",
      icon: "♧"
    },
    {
      to: "/dashboard/profile",
      label: "My Profile",
      icon: "♙"
    }
  ];

  const firstName = user?.name?.trim().split(/\s+/)[0] || "Applicant";

  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">
            YOUR CAREER SPACE
          </span>

          <h1>Welcome back, {firstName}!</h1>

          <p>
            Keep track of your career journey, applications,
            and opportunities all in one place.
          </p>
        </div>

        <div className="dashboard-avatar">
          {firstName.charAt(0).toUpperCase()}
        </div>
      </section>

      <section className="dashboard-stats">
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-icon blue">▤</div>
          <div>
            <p>Applications</p>
            <h2>{applicationCount ?? 0}</h2>
            <span>Jobs you've applied for</span>
          </div>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-icon purple">♡</div>
          <div>
            <p>Saved Jobs</p>
            <h2>{savedJobCount ?? 0}</h2>
            <span>Opportunities to revisit</span>
          </div>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-icon orange">♧</div>
          <div>
            <p>Job Alerts</p>
            <h2>{jobAlerts?.length ?? 0}</h2>
            <span>Your active job searches</span>
          </div>
        </article>
      </section>

      <section className="dashboard-workspace">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-heading">
            <span>WORKSPACE</span>
          </div>

          <nav className="dashboard-sidebar-nav">
            {dashboardLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-link active"
                    : "dashboard-link"
                }
              >
                <span className="dashboard-link-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>

                <span className="dashboard-link-arrow">›</span>
              </NavLink>
            ))}
          </nav>

          <div className="dashboard-sidebar-note">
            <span className="dashboard-note-icon">✦</span>
            <h3>Keep growing!</h3>
            <p>
              Keep your profile updated to stay ready for
              your next opportunity.
            </p>
          </div>
        </aside>

        <main className="dashboard-main">
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default Dashboard;