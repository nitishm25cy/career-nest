
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationCard from "../components/ApplicationCard";
import {
  loadApplications,
  withdrawApplicationAsync,
} from "../store/applicationsSlice";
import api from "../services/api";

function Applications() {
  const dispatch = useDispatch();

  const {
    items: applications,
    loading,
    error,
  } = useSelector((state) => state.applications);

  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawingId, setWithdrawingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    dispatch(loadApplications());
  }, [dispatch]);

  const handleWithdraw = async (applicationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmed) return;

    setWithdrawingId(String(applicationId));
    setWithdrawError("");

    try {
      await dispatch(
        withdrawApplicationAsync(applicationId)
      ).unwrap();
    } catch (err) {
      setWithdrawError(
        typeof err === "string"
          ? err
          : "Unable to withdraw the application. Please try again."
      );
      console.error("Withdrawal failed:", err);
    } finally {
      setWithdrawingId(null);
    }
  };

  // UPDATE application status using PATCH
  const handleUpdateStatus = async (application) => {
    console.log("[FRONTEND] Update button clicked:", application);


    const applicationId = String(application.id);

    const currentStatus =
      application.status || "Submitted";

    const newStatus =
      currentStatus === "Submitted"
        ? "Under Review"
        : "Submitted";

    console.log("[FRONTEND] Sending PATCH request...");

    setUpdatingId(applicationId);
    setUpdateMessage("");
    setUpdateError("");

    try {
      const response = await api.patch(
        `/applications/${applicationId}`,
        { status: newStatus }
      );

      console.log(
        "[PATCH SUCCESS] Application updated:",
        response.data
      );

      setUpdateMessage(
        `Application status updated to "${newStatus}".`
      );

      // Reload the latest application data from the backend
      await dispatch(loadApplications());
} catch (err) {
  console.error("[PATCH ERROR] Message:", err.message);
  console.error("[PATCH ERROR] URL:", err.config?.url);
  console.error("[PATCH ERROR] Base URL:", err.config?.baseURL);
  console.error("[PATCH ERROR] Response:", err.response?.data);
  console.error("[PATCH ERROR] Status:", err.response?.status);

  setUpdateError(
    err.response?.data?.message ||
      err.message ||
      "Unable to update application status."
  );
} finally {
  setUpdatingId(null);
}
  };

  return (
    <main className="applications-page">
      <section className="applications-hero">
        <p className="section-eyebrow">YOUR CAREER JOURNEY</p>
        <h1>My Applications</h1>
        <p>
          Track and manage your job applications in one place.
        </p>
      </section>

      <section className="applications-content">
        <div className="applications-heading">
          <h2>Application History</h2>
          <span>{applications.length} Applications</span>
        </div>

        {loading && <p>Loading applications...</p>}

        {error && (
          <div role="alert">
            <p>Unable to load applications: {String(error)}</p>
            <button onClick={() => dispatch(loadApplications())}>
              Try Again
            </button>
          </div>
        )}

        {withdrawError && (
          <div role="alert">
            <p>{withdrawError}</p>
          </div>
        )}

        {updateMessage && (
          <p role="status">{updateMessage}</p>
        )}

        {updateError && (
          <div role="alert">
            <p>{updateError}</p>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>
              Explore available jobs and submit your first application.
            </p>
            <Link to="/jobs">Explore Jobs</Link>
          </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="applications-grid">
            {applications.map((application) => (
              <div key={application.id}>
                <ApplicationCard
                  application={application}
                  onWithdraw={() =>
                    handleWithdraw(application.id)
                  }
                />

                <button
                  type="button"
                  disabled={
                    updatingId === String(application.id) ||
                    withdrawingId === String(application.id)
                  }
                  onClick={() => handleUpdateStatus(application)}
                >
                  {updatingId === String(application.id)
                    ? "Updating..."
                    : `Update Status (${
                        application.status || "Submitted"
                      })`}
                </button>

                {withdrawingId === String(application.id) && (
                  <p role="status">
                    Withdrawing application...
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Applications;
