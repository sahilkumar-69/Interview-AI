import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user with email/username and password
 * @access Public
 */

authRouter.post("/login", loginUser);

/**
 * @route GET /api/auth/logout
 * @desc Logout a user by blacklisting the token
 * @access Private
 */

authRouter.get("/logout", authMiddleware, logoutUser);

/**
 * @route GET /api/auth/me
 * @desc Get the currently logged-in user
 * @access Private
 */

authRouter.get("/me", authMiddleware, getCurrentUser);
