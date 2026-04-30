
import {Job} from "../models/job.model.js";
import mongoose from "mongoose";
//admin
export const postJob = async(req,res)=>{
    try{
      const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
      const userId = req.id;
      if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
          message:"something is missing",
          success:false
        })
      }
      const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId
      }) 
      return res.status(201).json({
        message:"New job created successfully",
        job,
        success:true
      })
    }catch(error){
       console.log(error);
    }
} 
//student
export const getAllJobs=async(req,res)=>{
  try {
    const jobs = await Job.find({})
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("getAllJobs error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

// student - search jobs
export const searchJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
console.log(req.query.keyword);

    const jobs = await Job.find({
      $or: [
    { title: { $regex: keyword, $options: "i" } },
    { location: { $regex: keyword, $options: "i" } },
  ],
    })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("searchJobs error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//student
export const getJobById = async(req,res)=>{
  try{
     const jobId = req.params.id && String(req.params.id).trim();

     // Validate ObjectId to avoid Mongoose CastError when invalid values (eg. 'get') are provided
     if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
       return res.status(400).json({
         message: "Invalid job id",
         success: false,
       });
     }

     const job = await Job.findById(jobId).populate({
      path:"applications"
     });
     if(!job){ 
      return res.status(404).json({
        message:"Job not found",
        success:false
     })
    }
    return res.status(200).json({
      job,
      success:true
     })
  }catch(error){
    console.log(error);
  }
}
//admin kitne job create kra hai abhi tk
export const getAdminJobs = async(req,res)=>{
  try{
       const adminId = req.id;
       const jobs = await Job.find({created_by:adminId}).populate({
        path:'company',
        createdAt:-1
       });
       if(!jobs){
        return res.status(404).json({
          message:"Job not found",
          success:false
       })
      };
      return res.status(200).json({
        jobs,
        success:true
      })
  }catch(error){
    console.log(error);
  }
}