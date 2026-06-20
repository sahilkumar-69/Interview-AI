import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { interviewRouter } from "./routes/interview.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);

app.use("/api/interview", authMiddleware, interviewRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
