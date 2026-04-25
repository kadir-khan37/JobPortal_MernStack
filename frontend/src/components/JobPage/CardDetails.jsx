import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  Jobs_API_Endpoint,
  Application_API_Endpoint,
} from "../../Utils/constant.js";

const CardDetails = () => {
  const { id: jobId } = useParams();
  const currentUser = useSelector((store) => store.auth?.user);
 const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); // for authenticate if user not logged in navigatete login page
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  /* ---------------- FETCH JOB ---------------- */
  if(!user){
    navigate("/login");
  }
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${Jobs_API_Endpoint}/get/${jobId}`,
          { withCredentials: true }
        );

        if (response.data?.success) {
          setJob(response.data.job);
        }
      } catch (error) {
        console.error("Failed to load job");
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  /*  CHECK IF APPLIED */
  const alreadyApplied = useMemo(() => {
    if (!job || !currentUser) return false;

    return (job.applications || []).some((application) => {
      if (typeof application === "string")
        return String(application) === String(currentUser._id);

      if (typeof application === "object")
        return String(application.applicant) === String(currentUser._id);

      return false;
    });
  }, [job, currentUser]);

  /* ---------------- APPLY JOB ---------------- */
  const handleApplyJob = async () => {
    if (!job || alreadyApplied || isApplying) return;

    try {
      setIsApplying(true);

      const response = await axios.post(
        `${Application_API_Endpoint}/apply/${job._id}`,
        {},
        { withCredentials: true }
      );

      if (response.data?.success) {
        alert("Applied Successfully");

        //  Refetch job to stay in sync with backend
        const updatedJob = await axios.get(
          `${Jobs_API_Endpoint}/get/${job._id}`,
          { withCredentials: true }
        );

        setJob(updatedJob.data.job);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("You have already applied");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setIsApplying(false);
    }
  };

   
  if (isLoading) {
    return (
      <div className="w-full px-10 py-8 text-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="w-full px-10 py-8 text-center text-gray-500">
        Job not found
      </div>
    );
  }


 
  return (
    <div className="w-full px-10 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{job.title}</h1>

        <button
          disabled={alreadyApplied || isApplying}
          onClick={handleApplyJob}
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            alreadyApplied || isApplying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {alreadyApplied
            ? "Already Applied"
            : isApplying
            ? "Applying..."
            : "Apply Now"}
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        {(job.requirements || []).map((req, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-red-200 text-red-600 rounded-md text-sm"
          >
            {req}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Job Description
        </h2>

        <div className="mt-5 text-gray-800 leading-7">
          <p><strong>Role:</strong> {job.title}</p>
          <p><strong>Positions:</strong> {job.position}</p>
          <p><strong>Location:</strong> {job.location || "Not specified"}</p>
          <p><strong>Description:</strong> {job.description || "No description"}</p>
          <p><strong>Experience:</strong> {job.experienceLevel || "N/A"}</p>
          <p><strong>Salary:</strong> {job.salary || "N/A"}</p>
          <p><strong>Total Applicants:</strong> {(job.applications || []).length}</p>
          <p>
            <strong>Posted Date:</strong>{" "}
            {job.createdAt
              ? new Date(job.createdAt).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
