import React, { useEffect } from "react";
import LatestJobCards from "./LatestJobCards.jsx";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import UseGetAllJobs from "../../hooks/UseGetAllJobs.jsx";

const LatestJob = () => {
  const { user } = useSelector((store) => store.auth);
 const { jobs } = useSelector((store) => store.jobs);
 const navigate = useNavigate();
 
 const isLoading = UseGetAllJobs(user);

  if (isLoading) {
    return (
      <div className="w-full px-10 py-8 text-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="w-full mt-0 ">
      <div className="text-3xl font-bold  ml-30 mb-8 ">
    
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 my-5  ml-30 max-w-5xl mx-auto hover:scale-1.5 "
     >

        {(!jobs || jobs.length <= 0) ? (
          <span className="text-2xl font-bold">No Job Found</span>
        ) : (
          jobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} onClick={()=>navigate(`/details/${job._id}`)}/>)
        )}
      </div>
    </div>
  );
};

export default LatestJob;
