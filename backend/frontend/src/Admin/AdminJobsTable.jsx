import React from "react";
import UseGetAdminJobs from "../hooks/UseGetAdminJobs.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useSelector } from "react-redux";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = ({ search }) => {
  const user = useSelector((state) => state.auth.user);
 const navigate=useNavigate();
  const { jobs } = useSelector((state) => state.adminJobs);

  const loading = UseGetAdminJobs(user);

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search?.toLowerCase() || "")
  );

  return (
    <div>
      <Table>
        <TableCaption>Your Jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Requirements</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Jobs Found
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.requirements}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
                  <Eye size={18} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
