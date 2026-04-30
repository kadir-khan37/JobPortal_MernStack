import { createSlice } from "@reduxjs/toolkit";

const adminJobSlice = createSlice({
  name: "adminJobs",
  initialState: {
    jobs: [],
    singleJob: null,
  },
  reducers: {
    setAdminJobs: (state, action) => {
      state.jobs = action.payload;
    },

    setAdminSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAdminJobs, setAdminSingleJob } =
  adminJobSlice.actions;

export default adminJobSlice.reducer;
