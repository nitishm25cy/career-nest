
import { createSlice } from "@reduxjs/toolkit";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  education: "",
  skills: "",
  experience: "",
  bio: "",
};

const loadProfile = () => {
  try {
    const savedProfile = localStorage.getItem("careerNestProfile");

    return savedProfile
      ? { ...defaultProfile, ...JSON.parse(savedProfile) }
      : { ...defaultProfile };
  } catch {
    return { ...defaultProfile };
  }
};

const profileSlice = createSlice({
  name: "profile",
  initialState: loadProfile(),
  reducers: {
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetProfile: () => ({ ...defaultProfile }),
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
