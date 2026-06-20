import { Router } from "express";
import { generateInterviewResponse } from "../controllers/interview.controller.js";
import { fileUpload } from "../middleware/file.middleware.js";

export const interviewRouter = Router();

/**
 * @route POST /api/interview/
 *
 */

interviewRouter.post(
  "/",
  fileUpload.single("resume"),
  generateInterviewResponse,
);
