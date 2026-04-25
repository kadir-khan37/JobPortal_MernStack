import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { Jobs_API_Endpoint } from "../Utils/constant.js";
import useGetAllCompanies from "../hooks/UseGetAllCompanies";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const CreateJobs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  
  const user = useSelector((state) => state.auth.user);
  useGetAllCompanies(user);

  const companies =
    useSelector((state) => state.company.companies) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => ({
      ...prev,
      [name]: name === "position" ? Number(value) : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputData.title ||
      !inputData.description ||
      !inputData.companyId
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${Jobs_API_Endpoint}/post`,
        inputData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(response.data?.message || "Job created successfully");

      navigate("/admin/job");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center mt-5">
      <div className="w-full max-w-xl rounded-2xl border border-gray-100 shadow-2xl p-6">
        <h1 className="text-3xl font-medium text-center mb-4">
          Job Details
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={inputData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={inputData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="text"
            name="requirements"
            placeholder="Requirements"
            value={inputData.requirements}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={inputData.salary}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={inputData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="text"
            name="jobType"
            placeholder="Job Type"
            value={inputData.jobType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={inputData.experience}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <input
            type="number"
            name="position"
            placeholder="Position"
            value={inputData.position}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />

          <Select
            value={inputData.companyId}
            onValueChange={(value) =>
              setInputData((prev) => ({
                ...prev,
                companyId: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>

            <SelectContent>
              {companies.length === 0 ? (
                <p className="text-sm text-gray-500 px-2">
                  No companies available
                </p>
              ) : (
                companies.map((company) => (
                  <SelectItem
                    key={company._id}
                    value={company._id}
                  >
                    {company.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="mt-4 text-lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobs;
