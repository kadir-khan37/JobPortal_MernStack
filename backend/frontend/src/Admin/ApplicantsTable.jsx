import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/ui/table.jsx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover.jsx";

import { MoreHorizontal } from "lucide-react";
import axios from "@/utils/axios.js";
import { Application_API_Endpoint } from "../utils/constant.js";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ applicants = [], refetchApplicants }) => {

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${Application_API_Endpoint}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      alert(res.data.message);

      // optional: refresh table after update
      if (refetchApplicants) {
        refetchApplicants();
      }

    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="mt-4">
      <Table>
        <TableCaption>Applicants List</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No applicants found
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.applicant?.fullName}</TableCell>
                <TableCell>{app.applicant?.email}</TableCell>
                <TableCell>{app.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {app.applicant?.profile?.resume ? (
                    <a
                      href={app.applicant.profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>

                <TableCell>
                  {new Date(app.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="capitalize">
                  {app.status || "pending"}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, app._id)}
                          className="cursor-pointer my-2 hover:text-blue-600"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
