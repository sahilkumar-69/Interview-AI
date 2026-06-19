import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import { generateText } from "./src/services/ai.service.js";
import {
  selfDescription,
  jobDescription,
  resume,
} from "./src/services/candidate.js";

// generateText({ jobDescription, resume, selfDescription });

const PORT = process.env.PORT || 8989;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
