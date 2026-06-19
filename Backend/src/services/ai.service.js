import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { writeFile } from "fs/promises";

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  technicalQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical question asked during the interview."),
      answer: z
        .string()
        .describe(
          "The candidate's answer and approach to the technical question in an informative manner.",
        ),
      intention: z
        .number()
        .describe(
          "The intention of the interviewer behind the technical question.",
        ),
    }),
  ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question asked during the interview."),
        answer: z
          .string()
          .describe(
            "The candidate's answer and approach to the behavioral question in an informative manner.",
          ),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind the behavioral question.",
          ),
      }),
    )
    .describe(
      "An array of behavioral questions asked during the interview, along with the candidate's answers and the interviewer's intentions.",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate is lacking."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of the skill gap, categorized as low, medium, or high.",
          ),
      }),
    )
    .describe(
      "An array of skill gaps identified during the interview, along with their severity levels.",
    ),
  matchScore: z
    .number()
    .describe(
      "A score indicating how well the candidate matches the job requirements, on a scale from 0 to 100.",
    ),
});

async function generateText({ jobDescription, resume, selfDescription }) {
  const prompt = `Based on the following job description and candidate resume, generate a detailed interview report that includes:
    1. A list of technical questions that would be relevant to ask the candidate, along with the candidate's potential answers and the interviewer's intentions behind each question.
    2. A list of behavioral questions that would be relevant to ask the candidate, along with the candidate's potential answers and the interviewer's intentions behind each question.
    3. An analysis of any skill gaps identified during the interview, categorized by severity (low, medium, high).
    4. An overall match score indicating how well the candidate matches the job requirements, on a scale from 0 to 100.
    The job description is as follows:
    ${jobDescription}
    The candidate's resume is as follows:
    ${resume}
    The candidate's self-description is as follows:
    ${selfDescription}
    `;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    await writeFile("AiResponse.json", response.text.toString(), (err) => {
      if (err) {
        console.error("Error writing AI response to file:", err);
      } else {
        console.log("AI response successfully written to AiResponse.json");
      }
    });

    // console.log("Generated Text:", response.text);
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}

export { genAI, generateText };
