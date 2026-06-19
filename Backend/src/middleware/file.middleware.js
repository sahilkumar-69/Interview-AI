import multer, { memoryStorage } from "multer";

export const fileUpload = multer({
  storage: memoryStorage,
  limits: 10 * 1024 * 1024, // 10MB
});
