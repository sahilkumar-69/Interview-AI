import { Router } from "express";
import { generateInterviewResponse } from "../controllers/interview.controller.js";

export const interviewRouter = Router();

/**
 * @route POST /api/interview/
 *
 */

interviewRouter.post("/", generateInterviewResponse);
