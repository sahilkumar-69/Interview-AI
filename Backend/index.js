import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8989;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
