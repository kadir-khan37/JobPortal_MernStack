import React, { useState } from "react";
import axios from "../../utils/axios";              
import { User_API_Endpoint } from "../../Utils/constant.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Input Data:", inputData);

    const formData = new FormData();
    formData.append("fullName", inputData.fullName);
    formData.append("email", inputData.email);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("password", inputData.password);
    formData.append("role", inputData.role);

    if (inputData.file) {
      formData.append("file", inputData.file);
    }

    // Correct way to debug FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        `${User_API_Endpoint}/register`,    
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {

  // CHECK IF BACKEND SENT MESSAGE
  if (error.response && error.response.data) {
    alert(error.response.data.message);   // SHOW ERROR TO USER
  } else {
    alert("Something went wrong. Try again.");
  }

  console.log("Signup Error:", error);
}
  };

  const changeEventHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInputData({ ...inputData, file: e.target.files?.[0] });
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <form
        onSubmit={submitHandler}
        className="w-[450px] border p-8 rounded-lg shadow-sm bg-white"
      >
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

        {/* Full Name */}
        <label className="font-medium">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={inputData.fullName} // it is used to set default value in input field so when app rerender we can see the value we entered
          placeholder="Enter your full name"
          onChange={changeEventHandler}
          className="w-full border rounded-md p-2 mb-4 mt-1 outline-none"
        />

        {/* Email */}
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={inputData.email}
          placeholder="Enter your email"
          onChange={changeEventHandler}
          className="w-full border rounded-md p-2 mb-4 mt-1 outline-none"
        />

        {/* Phone */}
        <label className="font-medium">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={inputData.phoneNumber}
          placeholder="Enter phone number"
          onChange={changeEventHandler}
          className="w-full border rounded-md p-2 mb-4 mt-1 outline-none"
        />

        {/* Password */}
        <label className="font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={inputData.password}
          placeholder="Enter password"
          onChange={changeEventHandler}
          className="w-full border rounded-md p-2 mb-4 mt-1 outline-none"
        />

        {/* Radio Options */}
        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="student"
              checked={inputData.role === "student"}
              onChange={changeEventHandler}
            />
            Student
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={inputData.role === "recruiter"}
              onChange={changeEventHandler}
            />
            Recruiter
          </label>
        </div>

        {/* File Upload */}
        <label className="font-medium">Profile</label>
        <input
          accept="image/*"
          type="file"
          onChange={changeFileHandler}
          className="w-full border rounded-md p-2 mb-6 mt-1"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
