
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchApplications,
  createApplication,
  updateApplication,
  withdrawApplication,
} from "../services/api";

// Load applications from backend
export const loadApplications = createAsyncThunk(
  "applications/loadApplications",
  async () => {
    return await fetchApplications();
  }
);

// Submit a new application
export const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  async (application) => {
    return await createApplication(application);
  }
);

// Update an application
export const editApplication = createAsyncThunk(
  "applications/editApplication",
  async ({ id, data }) => {
    return await updateApplication(id, data);
  }
);

// Withdraw an application
export const withdrawApplicationAsync = createAsyncThunk(
  "applications/withdrawApplication",
  async (id) => {
    await withdrawApplication(id);
    return id;
  }
);

const applicationsSlice = createSlice({
  name: "applications",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    addApplication: (state, action) => {
      state.items.push(action.payload);
    },

    removeApplication: (state, action) => {
      state.items = state.items.filter(
        (app) => String(app.id) !== String(action.payload)
      );
    },

    clearApplications: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(submitApplication.fulfilled, (state, action) => {
        const newApplication = action.payload;
        const exists = state.items.some(
          (app) => String(app.id) === String(newApplication.id)
        );

        if (!exists) {
          state.items.push(newApplication);
        }
      })

      .addCase(editApplication.fulfilled, (state, action) => {
        const updatedApplication = action.payload;
        const index = state.items.findIndex(
          (app) => String(app.id) === String(updatedApplication.id)
        );

        if (index !== -1) {
          state.items[index] = updatedApplication;
        }
      })

      .addCase(withdrawApplicationAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (app) => String(app.id) !== String(action.payload)
        );
      });
  },
});

export const {
  addApplication,
  removeApplication,
  clearApplications,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
