
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Jobs from "../pages/Jobs";
import jobsReducer from "../store/jobsSlice";
import { saveJobApi, removeSavedJobApi } from "../services/api";
import { useJobContext } from "../context/JobContext";

// Mock child components and API calls
jest.mock("../components/JobCard", () => {
  return function MockJobCard({ job, saved, onSave }) {
    return (
      <div data-testid="job-card">
        <span>
          {job.title} - {job.company}
        </span>
        <button type="button" onClick={() => onSave(job.id)}>
          {saved ? "Remove saved job" : "Save job"}
        </button>
      </div>
    );
  };
});

jest.mock("../components/SearchBar", () => {
  return function MockSearchBar({ keyword, setKeyword }) {
    return (
      <input
        aria-label="Search jobs"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
    );
  };
});

jest.mock("../components/FilterPanel", () => {
  return function MockFilterPanel({ location, setLocation }) {
    return (
      <input
        aria-label="Filter by location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
    );
  };
});

jest.mock("../services/api", () => ({
  saveJobApi: jest.fn(),
  removeSavedJobApi: jest.fn(),
}));

jest.mock("../store/jobsSlice", () => ({
  __esModule: true,
  default: (state = { items: [], loading: false, error: null }) => state,
  loadJobs: jest.fn(() => ({ type: "jobs/loadJobs" })),
}));

jest.mock("../store/savedJobsSlice", () => ({
  saveJobToStore: jest.fn((id) => ({
    type: "savedJobs/save",
    payload: id,
  })),
  removeSavedJobFromStore: jest.fn((id) => ({
    type: "savedJobs/remove",
    payload: id,
  })),
}));

jest.mock("../context/JobContext", () => ({
  useJobContext: jest.fn(),
}));

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    industry: "IT",
    location: "Coimbatore",
    type: "Full-time",
    salary: "40000",
    experience: "Fresher",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Cloud Systems",
    industry: "IT",
    location: "Chennai",
    type: "Full-time",
    salary: "80000",
    experience: "2 years",
  },
];

function renderJobs({
  items = mockJobs,
  loading = false,
  error = null,
  savedJobs = [],
} = {}) {
  const store = configureStore({
    reducer: {
      jobs: jobsReducer,
      savedJobs: (state = []) => state,
    },
    preloadedState: {
      jobs: { items, loading, error },
      savedJobs,
    },
  });

  const context = {
    keyword: "",
    setKeyword: jest.fn(),
    location: "",
    setLocation: jest.fn(),
    industry: "",
    setIndustry: jest.fn(),
    experience: "",
    setExperience: jest.fn(),
    type: "",
    setType: jest.fn(),
    savedJobs,
    saveJob: jest.fn(),
    removeSavedJob: jest.fn(),
    clearFilters: jest.fn(),
  };

  useJobContext.mockReturnValue(context);

  const result = render(
    <Provider store={store}>
      <MemoryRouter>
        <Jobs />
      </MemoryRouter>
    </Provider>
  );

  return { ...result, context, store };
}

describe("Jobs page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays available jobs", () => {
    renderJobs();

    expect(
      screen.getByRole("heading", { name: "Available Jobs" })
    ).toBeInTheDocument();

    expect(screen.getByText("2 Jobs Found")).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/)).toBeInTheDocument();
    expect(screen.getByText(/Backend Developer/)).toBeInTheDocument();
  });

  test("displays the loading state", () => {
    renderJobs({ loading: true });

    expect(screen.getByText("Loading jobs...")).toBeInTheDocument();
    expect(screen.queryByTestId("job-card")).not.toBeInTheDocument();
  });

  test("displays an error state", () => {
    renderJobs({ error: "Server unavailable" });

    expect(
      screen.getByRole("heading", { name: "Unable to load jobs" })
    ).toBeInTheDocument();

    expect(screen.getByText("Server unavailable")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  test("shows the no jobs message when there are no listings", () => {
    renderJobs({ items: [] });

    expect(screen.getByText("No jobs found")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset Filters" })
    ).toBeInTheDocument();
  });

  test("updates the keyword search input", () => {
    const { context } = renderJobs();

    fireEvent.change(screen.getByRole("textbox", { name: "Search jobs" }), {
      target: { value: "Frontend" },
    });

    expect(context.setKeyword).toHaveBeenCalledWith("Frontend");
  });

  test("updates the location filter input", () => {
    const { context } = renderJobs();

    fireEvent.change(
      screen.getByRole("textbox", { name: "Filter by location" }),
      { target: { value: "Chennai" } }
    );

    expect(context.setLocation).toHaveBeenCalledWith("Chennai");
  });

  test("clears filters when Clear Filters is clicked", () => {
    const { context } = renderJobs();

    fireEvent.click(screen.getByRole("button", { name: "Clear Filters" }));

    expect(context.clearFilters).toHaveBeenCalled();
  });

  test("saves a job successfully", async () => {
    saveJobApi.mockResolvedValueOnce({ data: { success: true } });

    const { context } = renderJobs();

    fireEvent.click(
      screen.getAllByRole("button", { name: "Save job" })[0]
    );

    await waitFor(() => {
      expect(saveJobApi).toHaveBeenCalledWith(1);
      expect(context.saveJob).toHaveBeenCalledWith(1);
    });
  });

  test("shows an error when saving a job fails", async () => {
    saveJobApi.mockRejectedValueOnce(new Error("Network error"));

    const { context } = renderJobs();

    fireEvent.click(
      screen.getAllByRole("button", { name: "Save job" })[0]
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to update saved jobs. Please try again."
    );

    expect(context.saveJob).not.toHaveBeenCalled();
  });

  test("removes a saved job successfully", async () => {
    removeSavedJobApi.mockResolvedValueOnce({
      data: { success: true },
    });

    const { context } = renderJobs({ savedJobs: [1] });

    fireEvent.click(
      screen.getAllByRole("button", { name: "Remove saved job" })[0]
    );

    await waitFor(() => {
      expect(removeSavedJobApi).toHaveBeenCalledWith(1);
      expect(context.removeSavedJob).toHaveBeenCalledWith(1);
    });
  });

  test("shows an error when removing a saved job fails", async () => {
    removeSavedJobApi.mockRejectedValueOnce(new Error("Network error"));

    const { context } = renderJobs({ savedJobs: [1] });

    fireEvent.click(
      screen.getAllByRole("button", { name: "Remove saved job" })[0]
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to update saved jobs. Please try again."
    );

    expect(context.removeSavedJob).not.toHaveBeenCalled();
  });
});
