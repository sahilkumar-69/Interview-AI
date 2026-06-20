import { PDFParse } from "pdf-parse";
import InterviewModel from "../models/interview.model";

const generateInterviewResponse = async (req, res) => {
  const resumeFile = req.file;
  const { jobDescription, selfDescription } = req.body;

  const resumeText = await PDFParse(resumeFile.buffer);

  const aiResponse = await generateText({
    jobDescription,
    resume: resumeText.text,
    selfDescription,
  });

  await InterviewModel.create({
    user: req.user._id,
  });
};

export { generateInterviewResponse };
