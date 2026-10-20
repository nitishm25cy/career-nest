
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchJobAlerts,
  createJobAlert,
} from "../services/api";

// Load alerts from backend
export const loadAlerts = createAsyncThunk(
  "alerts/loadAlerts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchJobAlerts();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load job alerts"
      );
    }
  }
);

// Create a new alert through the API
export const addAlertAsync = createAsyncThunk(
  "alerts/addAlert",
  async (alertData, { rejectWithValue }) => {
    try {
      return await createJobAlert(alertData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create job alert"
      );
    }
  }
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    items: [],
    loading: false,
    creating: false,
    error: null,
  },
  reducers: {
    addAlert: (state, action) => {
      state.items.push(action.payload);
    },
    clearAlerts: (state) => {
      state.items = [];
    },
    clearAlertError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load job alerts";
      })
      .addCase(addAlertAsync.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(addAlertAsync.fulfilled, (state, action) => {
        state.creating = false;

        const newAlert = action.payload;
        const exists = state.items.some(
          (alert) => String(alert.id) === String(newAlert.id)
        );

        if (!exists) {
          state.items.push(newAlert);
        }
      })
      .addCase(addAlertAsync.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || "Failed to create job alert";
      });
  },
});

export const {
  addAlert,
  clearAlerts,
  clearAlertError,
} = alertsSlice.actions;

export default alertsSlice.reducer;
