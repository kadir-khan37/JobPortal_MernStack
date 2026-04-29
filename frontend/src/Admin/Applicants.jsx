import React, { useEffect, useCallback } from "react";
import ApplicantsTable from "./ApplicantsTable.jsx";
import { Application_API_Endpoint } from "../utils/constant.js";
import { useParams } from "react-router-dom";
import axios from "@/utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../redux/ApplicantsSlice.js";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const applicants = useSelector((state) => state.applicants.applicants);

  const fetchApplicants = useCallback(async () => {
    try {
      const res = await axios.get(
        `${Application_API_Endpoint}/${id}/applicants`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setApplicants(res.data.job.applications));
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10">
      <h1 className="font-bold text-2xl">
        Applicants ({applicants.length})
      </h1>

      <ApplicantsTable
        applicants={applicants}
        refetchApplicants={fetchApplicants}
      />
    </div>
  );
};

export default Applicants;
