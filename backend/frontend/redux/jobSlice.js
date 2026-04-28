import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",

  initialState: {
    jobs: [],
    singleJob: null,
    appliedJobs: [],
    searchQuery: "",        
    searchedJobs: [],       
  },

  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },

    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },

    setAppliedJobs(state, action) {
      state.appliedJobs = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;   
    },

    setSearchedJobs(state, action) {
      state.searchedJobs = action.payload; 
    },
  },
});

export const {
  setJobs,
  setSingleJob,
  setAppliedJobs,
  setSearchQuery,
  setSearchedJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
