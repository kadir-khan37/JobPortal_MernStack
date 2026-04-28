import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "@/utils/axios.js";
import { User_API_Endpoint } from "../../utils/constant.js";
import { setUser } from "../../../redux/authSlice.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog.jsx";
import { Button } from "../../components/ui/button.jsx";

const UpdateProfileModal = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  if (!user) return null;

  const [inputData, setInputData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    bio: user.profile?.bio || "",
    skills: user.profile?.skills?.join(", ") || "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert skills string -> comma separated string (backend splits it)
    const skillsArray = inputData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append("fullName", inputData.fullName);
    formData.append("email", inputData.email);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("bio", inputData.bio);
    formData.append("skills", skillsArray.join(","));

    if (file) formData.append("file", file);

    try {
      const response = await axios.post(
        `${User_API_Endpoint}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");

        //  UPDATE REDUX TO REFLECT NEW USER DATA
        dispatch(setUser(response.data.user));  

        setOpen(false);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input
              className="border rounded-md px-3 py-2 w-full text-sm"
              name="fullName"
              value={inputData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="border rounded-md px-3 py-2 w-full text-sm"
              name="email"
              value={inputData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Phone</label>
            <input
              className="border rounded-md px-3 py-2 w-full text-sm"
              name="phoneNumber"
              value={inputData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="border rounded-md px-3 py-2 w-full text-sm"
              name="bio"
              value={inputData.bio}
              onChange={handleChange}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Skills (comma separated)</label>
            <input
              className="border rounded-md px-3 py-2 w-full text-sm"
              name="skills"
              value={inputData.skills}
              onChange={handleChange}
            />
          </div>

          {/* Resume */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Resume (optional)</label>
            <input
              type="file"
              className="border rounded-md p-2 text-sm"
              onChange={handleFileChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 flex-wrap">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
