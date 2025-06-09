import { GoogleGenAI } from "@google/genai";
import { aiInstruction } from "./instructions.mjs";

/**
 * Function aiAnswer: Generates an answer from the AI based on the provided prompt.
 *
 * @param {string} prompt - The prompt to generate the answer from.
 * @returns {Promise<string>} - The generated answer.
 * @throws {Error} - If the prompt is not provided or if there is an error generating the answer.
 *
 * @example
 * const prompt = 'Apa saja bagian yang harus ada di CV?';
 */
export const aiAnswer = async (prompt) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-2.0-flash-001";

  if (!prompt) {
    throw new Error("Prompt is required");
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: aiInstruction,
        maxOutputTokens: 250,
        tools: [{ googleSearch: {} }],
      },
    });

    const result = response.text;
    console.log("GENERATED ANSWER:", result);
    return result;
  } catch (error) {
    console.error("ERROR GENERATING ANSWER:", error);
    throw new Error("Failed to generate answer from AI.");
  }
};
