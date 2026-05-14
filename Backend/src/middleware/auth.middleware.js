import jwt, { } from "jsonwebtoken";
import { BlacklistModel } from "../models/blacklist.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blacklistedToken = await BlacklistModel.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
