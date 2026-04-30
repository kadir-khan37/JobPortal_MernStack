import React, { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import axios from "@/utils/axios.js";
import { useParams, useNavigate } from "react-router-dom";
import { Company_API_Endpoint } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companyslice.js";

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

    try {
      setLoading(true);

      formData.append("name", inputData.name);
      formData.append("description", inputData.description);
      formData.append("website", inputData.website);
      formData.append("location", inputData.location);

      // ✅ IMPORTANT: file key MUST match multer.single("file")
      

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

      alert("Company updated successfully");
      navigate("/admin/companies");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl border shadow-xl p-6">

        <h1 className="text-3xl font-bold text-center mb-5">
          Fill Company Details
        </h1>

        <form onSubmit={submitForm} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="border p-2 rounded"
            required
          />

          <textarea
            name="description"
            value={inputData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="website"
            value={inputData.website}
            onChange={handleChange}
            placeholder="Website"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            value={inputData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
          />


          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white"
          >
            {loading ? "Updating..." : "Update Company"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FillCompanyDetails;