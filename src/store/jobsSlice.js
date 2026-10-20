
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs, fetchJobById } from "../services/api";

const CACHE_DURATION = 5 * 60 * 1000;

export const loadJobs = createAsyncThunk(
  "jobs/loadJobs",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchJobs();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load jobs"
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { items, lastFetched, loading } = getState().jobs;

      if (loading) return false;

      if (
        lastFetched &&
        Date.now() - lastFetched < CACHE_DURATION
      ) {
        return false;
      }

      return true;
    },
  }
);

export const loadJobDetails = createAsyncThunk(
  "jobs/loadJobDetails",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchJobById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load job details"
      );
    }
  },
  {
    condition: (id, { getState }) => {
      const { details, detailsFetchedAt, detailsLoading } =
        getState().jobs;

      if (detailsLoading[id]) return false;

      const fetchedAt = detailsFetchedAt[id];

      if (
        details[id] &&
        fetchedAt &&
        Date.now() - fetchedAt < CACHE_DURATION
      ) {
        return false;
      }

      return true;
    },
  }
);

const jobsSlice = createSlice({
  name: "jobs",

  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: null,

    details: {},
    detailsFetchedAt: {},
    detailsLoading: {},
    detailsErrors: {},
  },

  reducers: {
    clearJobs: (state) => {
      state.items = [];
      state.lastFetched = null;
      state.error = null;
    },

    clearJobDetails: (state, action) => {
      const id = String(action.payload);
      delete state.details[id];
      delete state.detailsFetchedAt[id];
      delete state.detailsErrors[id];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(loadJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(loadJobDetails.pending, (state, action) => {
        const id = String(action.meta.arg);
        state.detailsLoading[id] = true;
        delete state.detailsErrors[id];
      })
      .addCase(loadJobDetails.fulfilled, (state, action) => {
        const id = String(action.meta.arg);
        state.details[id] = action.payload;
        state.detailsFetchedAt[id] = Date.now();
        state.detailsLoading[id] = false;
      })
      .addCase(loadJobDetails.rejected, (state, action) => {
        const id = String(action.meta.arg);
        state.detailsLoading[id] = false;
        state.detailsErrors[id] =
          action.payload || "Something went wrong";
      });
  },
});

export const { clearJobs, clearJobDetails } = jobsSlice.actions;
export default jobsSlice.reducer;
