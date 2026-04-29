import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Company_API_Endpoint } from "../utils/constant.js";
import axios from "@/utils/axios.js";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companyslice.js";

const CreateCompanies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const CreateNewCompany = async () => {
  
    if (!companyName || !companyName.trim()) {
    alert("Company name is required");
    return;
  }

    try {

      
      const response = await axios.post(
        `${Company_API_Endpoint}/register`,
        { name: companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201  || response.data.success) {
      console.log("Company created:", response.data);
      dispatch(setSingleCompany(response.data.company));
      navigate(`/admin/companies/${response.data.company._id}`);
     
      }
    } catch (error) {
      console.error(
        "Error creating company:",
        error.response?.data || error.message
      );
      alert("Failed to create company");
    }
  };
  return (
    <div>
      <div className="px-4 md:px-8 lg:px-15 py-16">
        <div>
          <h2 className="text-2xl font-semibold ">Create New Company</h2>
          <p className="text-gray-600">
            This is the Create Companies page. Here, you can add new companies
            to the system by filling out the required information and submitting
            the form.
          </p>
          <h1 className=" font-medium mt-6">Company Name</h1>
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            placeholder="Enter company name"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2"
          />
          <div className="mt-6">
            <button
              onClick={CreateNewCompany}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Company
            </button>
            <button
              onClick={() => navigate("/admin/companies")}
              className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanies;
