import React, { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import axios from "@/utils/axios.js";
import { useParams } from "react-router-dom";
import { Company_API_Endpoint } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companyslice.js";
import { useNavigate } from "react-router-dom";

const FillCompanyDetails = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
   const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInputData({ ...inputData, file: e.target.files[0] });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("website", inputData.website);
    formData.append("location", inputData.location);
    formData.append("file", inputData.file);

    try {
      const response = await axios.put(
        `${Company_API_Endpoint}/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setSingleCompany(response.data.company));
     
      alert("Company details updated successfully");
      navigate("/admin/companies");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">
          Updating company details...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl border shadow-xl p-6">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Fill Company Details
        </h1>

        <form onSubmit={submitForm} className="flex flex-col gap-4">

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={inputData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Brief company description"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={inputData.website}
              onChange={handleChange}
              placeholder="https://company.com"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={inputData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Logo
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded-lg bg-white"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`mt-4 text-white py-2 rounded-lg text-lg transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Submitting..." : "Submit Details"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default FillCompanyDetails;
