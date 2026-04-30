import UseGetAppliedJobs from "../../hooks/UseGetAppliedJobs.jsx";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StatusDetails = () => {
  const { id } = useParams();
  UseGetAppliedJobs();

  const { user } = useSelector((state) => state.auth);
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);

  if (!appliedJobs || appliedJobs.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const application = appliedJobs.find(app => app._id === id);

  if (!application) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-red-600">
        Application not found
      </div>
    );
  }
  
  if (application.status === "accepted") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        {user?.profile?.profilePhoto && (
          <img
            src={user.profile.profilePhoto}
            className="w-32 h-32 rounded-full mb-6"
          />
        )}

        <h1 className="text-3xl font-bold text-green-600">
          🎉 Congratulations!
        </h1>

        

        <p className="text-lg text-gray-700">
          You are selected for{" "}
          <span className="font-semibold">
            {application.job?.title}
          </span>{" "}
          at{" "}
          <span className="font-semibold">
            {application.job?.company?.name}
          </span>
        </p>

        <h2 className="text-3xl font-bold text-yellow-600">
          {`you will get the email from ${application.job?.company?.name} soon.....`}
        </h2>
      </div>
    );
  }

  // ================= REJECTED =================
  if (application.status === "rejected") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <h1 className="text-2xl text-red-600">
          ❌ Application Rejected
        </h1>
      </div>
    );
  }

  // ================= PENDING =================
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center">
      <h1 className="text-2xl text-yellow-600">
        ⏳ Application Pending
      </h1>
    </div>
  );
};

export default StatusDetails;
