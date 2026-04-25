
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User_API_Endpoint } from "../../Utils/constant.js";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    role: "student", // ✅ default role
  });

  const changeEventHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${User_API_Endpoint}/login`,
        {
          email: inputData.email,
          password: inputData.password,
          role: inputData.role, // ✅ send role
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // 🔥 MUST
        }
      );

      console.log("Login Response:", response.data);

      dispatch(login(response.data.user));
      alert("Login successful!");
      navigate("/");

    } catch (error) {
      console.log("FULL ERROR:", error.response);
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <form
        onSubmit={loginSubmitHandler}
        className="w-[450px] border p-8 rounded-lg shadow-sm bg-white"
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        {/* Email */}
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={inputData.email}
          onChange={changeEventHandler}
          placeholder="Enter email"
          className="w-full border rounded-md p-2 mb-4 mt-1 outline-none"
          required
        />

        {/* Password */}
        <label className="font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={inputData.password}
          onChange={changeEventHandler}
          placeholder="Enter password"
          className="w-full border rounded-md p-2 mb-4 mt-1 outline-none"
          required
        />

        {/* 🔥 ROLE SELECTOR */}
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

        {/* Button */}
        <button className="w-full bg-[#0d172a] text-white py-2 rounded-md hover:bg-black transition">
          Login
        </button>

        {/* Redirect */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?
          <Link to="/signup" className="text-blue-600 ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;