import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Apply from "./pages/Apply";
import ApplicationReview from "./pages/ApplicationReview";
import ApplicationConfirmation from "./pages/ApplicationConfirmation";

// Protected portal pages
import SavedJobs from "./pages/SavedJobs";
import Applications from "./pages/Applications";
import JobAlerts from "./pages/JobAlerts";
import Profile from "./pages/Profile";

// Dashboard
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DashboardApplications from "./pages/DashboardApplications";
import DashboardSavedJobs from "./pages/DashboardSavedJobs";
import DashboardJobAlerts from "./pages/DashboardJobAlerts";
import DashboardProfile from "./pages/DashboardProfile";

function App() {
  return (
    <BrowserRouter>

        <Routes>

          {/* =========================
              PUBLIC ROUTES
              ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/job/:id"
            element={<JobDetail />}
          />

          {/* Authentication MUST stay outside ProtectedRoute */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* =========================
              APPLICATION FLOW
              ========================= */}

          <Route
            path="/application-review/:id"
            element={<ApplicationReview />}
          />

          <Route
            path="/application-confirmation/:id"
            element={<ApplicationConfirmation />}
          />

          {/* =========================
              PROTECTED PORTAL ROUTES
              ========================= */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/apply/:id"
              element={<Apply />}
            />

            <Route
              path="/saved-jobs"
              element={<SavedJobs />}
            />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/alerts"
              element={<JobAlerts />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* =========================
                PROTECTED DASHBOARD
                ========================= */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            >

              <Route
                index
                element={<DashboardHome />}
              />

              <Route
                path="applications"
                element={<DashboardApplications />}
              />

              <Route
                path="saved-jobs"
                element={<DashboardSavedJobs />}
              />

              <Route
                path="job-alerts"
                element={<DashboardJobAlerts />}
              />

              <Route
                path="profile"
                element={<DashboardProfile />}
              />

            </Route>

          </Route>

        </Routes>

    </BrowserRouter>
  );
}

export default App;