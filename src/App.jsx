
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded public pages
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

// Lazy-loaded application pages
const Apply = lazy(() => import("./pages/Apply"));
const ApplicationReview = lazy(
  () => import("./pages/ApplicationReview")
);
const ApplicationConfirmation = lazy(
  () => import("./pages/ApplicationConfirmation")
);

// Lazy-loaded protected pages
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const Applications = lazy(() => import("./pages/Applications"));
const JobAlerts = lazy(() => import("./pages/JobAlerts"));
const Profile = lazy(() => import("./pages/Profile"));

// Lazy-loaded dashboard pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const DashboardApplications = lazy(
  () => import("./pages/DashboardApplications")
);
const DashboardSavedJobs = lazy(
  () => import("./pages/DashboardSavedJobs")
);
const DashboardJobAlerts = lazy(
  () => import("./pages/DashboardJobAlerts")
);
const DashboardProfile = lazy(
  () => import("./pages/DashboardProfile")
);

// Loading fallback
function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        padding: "40px 20px",
        textAlign: "center",
        fontSize: "16px",
      }}
    >
      Loading page...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Application flow */}
            <Route
              path="/application-review/:id"
              element={<ApplicationReview />}
            />
            <Route
              path="/application-confirmation/:id"
              element={<ApplicationConfirmation />}
            />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/apply/:id" element={<Apply />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/alerts" element={<JobAlerts />} />
              <Route path="/profile" element={<Profile />} />

              {/* Nested dashboard routes */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
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
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
