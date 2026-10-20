
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch jobs from your CareerNest backend
export const fetchJobs = async (search = "") => {
  const response = await api.get("/jobs", {
    params: search ? { search } : {},
  });

  return response.data;
};


export const fetchSavedJobs = async () => {
  const response = await api.get("/saved-jobs");
  return response.data;
};

// Fetch one job by ID
export const fetchJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// Fetch applications
export const fetchApplications = async () => {
  const response = await api.get("/applications");
  return response.data;
};

// Create an application
export const createApplication = async (application) => {
  const response = await api.post("/applications", application);
  return response.data;
};

// Update an application
export const updateApplication = async (id, data) => {
  const response = await api.patch(`/applications/${id}`, data);
  return response.data;
};

// Withdraw an application
export const withdrawApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

// Fetch job alerts
export const fetchJobAlerts = async () => {
  const response = await api.get("/alerts");
  return response.data;
};

// Create a job alert
export const createJobAlert = async (alert) => {
  const response = await api.post("/alerts", alert);
  return response.data;
};

export const saveJobApi = async (jobId) => {
  const response = await api.post("/saved-jobs", { jobId });
  return response.data;
};

export const removeSavedJobApi = async (jobId) => {
  const response = await api.delete(`/saved-jobs/${jobId}`);
  return response.data;
};

export default api;
