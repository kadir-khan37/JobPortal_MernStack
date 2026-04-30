import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async(req,res)=>{
  console.log("🔥 REGISTER COMPANY HIT");
    try{
      console.log("REQ.ID:", req.id);   // 👈 ADD HERE
      console.log("BODY:", req.body);   // (optional but useful)
  
  
       const {name} = req.body;
       if(!name){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        });
       }
       let company = await Company.findOne({name:name});
       if(company){
        return res.status(400).json({
            message:"company already registered",
            success:false
        })
       };
     company= await Company.create({
        name:name,
        userId:req.id // user who create company
     })

     return res.status(201).json({
        message:"company registered successfully",
        company,
        success:true
     })

    }catch (error) {
      console.log(error);
    
      // 🔥 HANDLE DUPLICATE KEY ERROR
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Company already registered",
          success: false,
        });
      }
    
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
}

export const getCompany = async(req,res)=>{
    try{
         const userId = req.id;
         const companies = await Company.find({userId});
         if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success:false
            })
         }
         return res.status(200).json({
            companies,
            success:true
         })
    }catch(error){
        console.log(error);
    };
}

export const getCompanyById = async(req,res)=>{
    try{
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
        })
      }
      return res.status(200).json({
        company,
        success:true
      })
    }catch(error){
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // ✅ safe update (only update if value exists)
    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    // ✅ actual update in DB
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // ✅ correct check
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });

  } catch (error) {
    console.error("Update Company Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};