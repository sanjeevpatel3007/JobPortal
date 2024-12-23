import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const useGeminiAI = () => {
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generateContent = async (prompt) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { generateContent, loading };
};

export default useGeminiAI; 