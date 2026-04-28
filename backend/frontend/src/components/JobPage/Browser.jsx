import React, { useEffect } from "react";
import Job from "./Job.jsx";
import { useDispatch, useSelector } from "react-redux";

import UseGetSearchJobs from "../../hooks/UseGetSearchJobs.jsx";
import { setSearchQuery } from "../../../redux/jobSlice.js";

const Browse = () => {
  const dispatch = useDispatch();

  UseGetSearchJobs();

  const { searchedJobs } = useSelector((state) => state.jobs);

  const displayJobs = searchedJobs;

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Result ({displayJobs.length})
        </h1>

        {displayJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-2xl ">No jobs found </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
