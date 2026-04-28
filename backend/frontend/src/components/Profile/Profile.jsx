import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateProfileModal from "./UpdateProfileModal.jsx";
import UseGetAppliedJobs from "../../hooks/UseGetAppliedJobs.jsx";
import { Button } from "../ui/button.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch applied jobs
  const loading = UseGetAppliedJobs();

  // Applied jobs from redux
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="px-4 md:px-10 lg:px-16 py-10">
      {/* ================= PROFILE CARD ================= */}
      <div className="border rounded-xl p-6 bg-white shadow-sm relative">
        <button
          onClick={() => setOpen(true)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiEdit size={20} />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          {user.profile?.profilePhoto ? (
            <img
              src={user.profile.profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {/* ================= USER INFO ================= */}
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-xl font-semibold">{user.fullName}</h2>

            <p className="text-gray-600">
              {user.profile?.bio || "No bio added yet"}
            </p>

            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone />
              <span>{user.phoneNumber}</span>
            </div>

            {/* ================= STUDENT ONLY ================= */}
            {user.role === "student" && (
              <>
                {/* Skills */}
                <div className="mt-4">
                  <h3 className="font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(Array.isArray(user.profile?.skills)
                      ? user.profile.skills
                      : JSON.parse(user.profile?.skills || "[]")
                    ).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div className="mt-4">
                  <h3 className="font-semibold">Resume</h3>
                  {user.profile?.resume ? (
                    <a
                      href={user.profile.resumeOriginalName}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-500">No resume uploaded</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= APPLICATIONS TABLE ================= */}
      {user.role === "student" && (
        <>
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Applications</h2>

            <div className="border rounded-lg p-4 overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableCaption>Your job applications</TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : appliedJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No applications found
                      </TableCell>
                    </TableRow>
                  ) : (
                    appliedJobs.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell>
                          {new Date(app.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{app.job?.title}</TableCell>
                        <TableCell>{app.job?.company?.name}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`px-3 py-1 rounded-lg text-white ${
                              app.status === "selected"
                                ? "bg-green-600"
                                : app.status === "rejected"
                                ? "bg-red-600"
                                : "bg-gray-600"
                            }`}
                          >
                            {app.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() =>
                              navigate(`/status/details/${app._id}`)
                            }
                          >
                            Check Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      {/*UPDATE PROFILE MODAL*/}
      <UpdateProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
