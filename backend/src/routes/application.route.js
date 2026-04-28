import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controllers.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Apply for a job
router.post("/apply/:id", isAuthenticated, applyJob);

// User dashboard – applied jobs
router.get("/get", isAuthenticated, getAppliedJobs);

// Recruiter dashboard – applicants
router.get("/:id/applicants", isAuthenticated, getApplicants);

// Update application status (ACCEPT / REJECT)
router.post("/status/:id/update", isAuthenticated, updateStatus);

export default router;
