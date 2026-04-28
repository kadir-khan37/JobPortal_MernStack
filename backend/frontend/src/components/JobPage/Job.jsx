import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  
 if (!job) return null;
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="w-full rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 p-4 bg-white"
    >
      {/* Top Row */}
      <div className="flex justify-between text-sm text-gray-500">
        <p>{new Date(job.createdAt).toLocaleDateString() }</p>
        <p className="cursor-pointer hover:text-blue-500">Save</p>
      </div>

      {/* Logo & Name */}
      <div className="mt-3 flex items-center">
        <img
          src="data:image/png;base64,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"
          alt="company logo"
          className="w-12 h-12 rounded-lg border"
        />

        <div className="flex flex-col ml-3">
          <p className="font-semibold"></p>
          <p className="text-gray-600 text-sm">India</p>
        </div>
      </div>

      {/* Job Title */}
      <p className="mt-3 text-xl font-bold text-gray-900">
       {job.title}
      </p>

      <p className="mt-1 text-gray-700 text-sm">
        {job.description?.slice(0, 100)}...
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-3 mt-3 text-sm font-medium gap-2">
        <p className="text-gray-600">{job.position}</p>
        <p className="text-red-500">₹{job.salary}</p>
        <p className="text-green-600">{job.jobType}</p>
      </div>

      {/* Buttons */}
      <div className="flex mt-4 gap-3">
        <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold" onClick={()=>navigate(`/details/${job._id}`)}>
          Details
        </button>
        <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default Job;
