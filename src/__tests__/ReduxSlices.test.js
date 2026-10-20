import jobsReducer, { clearJobs, clearJobDetails } from "../store/jobsSlice";
import savedJobsReducer, { saveJobToStore, removeSavedJobFromStore, clearSavedJobs } from "../store/savedJobsSlice";
import applicationsReducer, { addApplication, removeApplication, clearApplications } from "../store/applicationsSlice";
import alertsReducer, { addAlert, clearAlerts, clearAlertError } from "../store/alertsSlice";
import profileReducer, { updateProfile, resetProfile } from "../store/profileSlice";

describe("Redux store reducers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("jobs reducer clears job items and error state", () => {
    const state = {
      items: [{ id: 1 }], loading: false, error: "old error", lastFetched: 123,
      details: { "1": { id: 1 } }, detailsFetchedAt: { "1": 123 },
      detailsLoading: {}, detailsErrors: {}
    };
    const cleared = jobsReducer(state, clearJobs());
    expect(cleared.items).toEqual([]);
    expect(cleared.lastFetched).toBeNull();
    expect(cleared.error).toBeNull();

    const detailsCleared = jobsReducer(cleared, clearJobDetails(1));
    expect(detailsCleared.details["1"]).toBeUndefined();
    expect(detailsCleared.detailsFetchedAt["1"]).toBeUndefined();
  });

  test("saved jobs can be added without duplicates and removed", () => {
    let state = [];
    state = savedJobsReducer(state, saveJobToStore(101));
    state = savedJobsReducer(state, saveJobToStore("101"));
    expect(state).toEqual(["101"]);
    state = savedJobsReducer(state, saveJobToStore(102));
    state = savedJobsReducer(state, removeSavedJobFromStore(101));
    expect(state).toEqual(["102"]);
    expect(savedJobsReducer(state, clearSavedJobs())).toEqual([]);
  });

  test("applications can be added, removed and cleared", () => {
    let state = { items: [], loading: false, error: null };
    state = applicationsReducer(state, addApplication({ id: 1, status: "Pending" }));
    state = applicationsReducer(state, addApplication({ id: 2, status: "Submitted" }));
    expect(state.items).toHaveLength(2);
    state = applicationsReducer(state, removeApplication("1"));
    expect(state.items).toEqual([{ id: 2, status: "Submitted" }]);
    state = applicationsReducer(state, clearApplications());
    expect(state.items).toEqual([]);
  });

  test("job alerts can be added and cleared", () => {
    let state = { items: [], loading: false, creating: false, error: "old error" };
    state = alertsReducer(state, addAlert({ id: 1, keyword: "React" }));
    expect(state.items).toEqual([{ id: 1, keyword: "React" }]);
    state = alertsReducer(state, clearAlertError());
    expect(state.error).toBeNull();
    state = alertsReducer(state, clearAlerts());
    expect(state.items).toEqual([]);
  });

  test("profile updates fields and reset restores defaults", () => {
    let state = profileReducer(undefined, { type: "@@INIT" });
    state = profileReducer(state, updateProfile({ name: "Test Applicant", skills: "React" }));
    expect(state.name).toBe("Test Applicant");
    expect(state.skills).toBe("React");
    state = profileReducer(state, resetProfile());
    expect(state.name).toBe("");
    expect(state.skills).toBe("");
  });
});
