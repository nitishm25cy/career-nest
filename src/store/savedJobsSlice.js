
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSavedJobs } from "../services/api";

// Load saved job IDs from localStorage
const loadSavedJobs = () => {
  try {
    const savedJobs = localStorage.getItem("careerNestSavedJobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  } catch {
    return [];
  }
};

// Retrieve saved jobs from the backend
export const loadSavedJobsFromApi = createAsyncThunk(
  "savedJobs/loadFromApi",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSavedJobs();

      // The backend may return IDs or job objects.
      return data.map((job) =>
        typeof job === "object" ? String(job.id) : String(job)
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load saved jobs"
      );
    }
  }
);

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: loadSavedJobs(),

  reducers: {
    saveJobToStore: (state, action) => {
      const jobId = String(action.payload);

      if (!state.some((id) => String(id) === jobId)) {
        state.push(jobId);
      }
    },

    removeSavedJobFromStore: (state, action) => {
      const jobId = String(action.payload);

      return state.filter((id) => String(id) !== jobId);
    },

    clearSavedJobs: () => [],
  },

  extraReducers: (builder) => {
    builder.addCase(loadSavedJobsFromApi.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  saveJobToStore,
  removeSavedJobFromStore,
  clearSavedJobs,
} = savedJobsSlice.actions;

export default savedJobsSlice.reducer;
