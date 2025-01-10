import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (req, res) => {
  try {
    const resumeFile = req.file;
    if (!resumeFile) {
      console.error("Error: No file uploaded.");
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert file to text
    let resumeText = '';
    try {
      if (resumeFile.mimetype === 'application/pdf') {
        const pdfData = await pdf(resumeFile.buffer);
        resumeText = pdfData.text;
      } else if (resumeFile.mimetype.includes('document')) {
        const result = await mammoth.extractRawText({ buffer: resumeFile.buffer });
        resumeText = result.value;
      } else {
        console.error(`Unsupported file type: ${resumeFile.mimetype}`);
        return res.status(400).json({ error: "Unsupported file type" });
      }
    } catch (fileProcessingError) {
      console.error("File processing error:", fileProcessingError);
      return res.status(500).json({ error: "Error processing file" });
    }

    // Enhanced prompt for better analysis
    const prompt = `
      You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume and provide a detailed evaluation:

      1. First, evaluate the resume on these key factors and provide a score for each (out of 10):
         - Keyword relevance and density
         - Professional experience clarity
         - Skills presentation
         - Education formatting
         - Overall formatting and structure
         - Quantifiable achievements
         - Action verbs usage
         - Technical skills presentation
         - Contact information completeness
         - File format and readability

      2. Calculate and provide the final ATS Score (sum of all scores, max 100) in this format: "ATS Score: X/100"

      3. Provide a detailed analysis including:
         - Key strengths
         - Areas for improvement
         - Specific recommendations
         - Keyword optimization suggestions
         - Format improvement tips

      Resume content:
      ${resumeText}

      Provide your analysis in a clear, structured format using ** for section headers.
    `;

    try {
      // Generate analysis using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysisText = response.text();

      // Parse the response
      const scoreMatch = analysisText.match(/ATS Score:\s*(\d+)\/100/i);
      let score = 75; // Default score

      if (scoreMatch) {
        score = parseInt(scoreMatch[1]);
      } else {
        console.warn("No explicit ATS score found in the analysis response. Falling back to keyword-based scoring.");
        const keywordMatches = {
          experience: resumeText.match(/experience|worked|managed|led|developed/gi),
          skills: resumeText.match(/skills|proficient|expertise|competent/gi),
          education: resumeText.match(/education|degree|university|college/gi),
          achievements: resumeText.match(/achieved|improved|increased|decreased|reduced/gi),
          contact: resumeText.match(/email|phone|linkedin|github/gi)
        };

        score = Object.values(keywordMatches).reduce((total, matches) => {
          return total + (matches ? matches.length * 5 : 0);
        }, 50); // Base score of 50

        // Cap the score at 100
        score = Math.min(score, 100);
      }

      // Split the analysis into sections
      const sections = analysisText.split(/\n(?=\*\*)/);
      const analysis = sections.map(section => {
        const lines = section.split('\n');
        const title = lines[0].replace(/^\*+|\*+$/, '').trim();
        const description = lines.slice(1).join('\n').trim();
        return {
          title,
          description: description.replace(/^\*+|\*+$/g, '').trim()
        };
      }).filter(item => item.title && item.description);

      // Add scoring breakdown if not present in the analysis
      if (!analysis.find(item => item.title.toLowerCase().includes('breakdown'))) {
        const scoringFactors = [
          'Keyword Optimization',
          'Format and Structure',
          'Experience Description',
          'Skills Presentation',
          'Education Details'
        ];

        const breakdownSection = {
          title: 'Scoring Breakdown',
          description: scoringFactors.map(factor => {
            const factorScore = Math.floor(score / scoringFactors.length);
            return `${factor}: ${factorScore}/20 points`;
          }).join('\n')
        };

        analysis.unshift(breakdownSection);
      }

      res.json({
        score,
        analysis
      });

    } catch (genAIError) {
      console.error("Error generating analysis using Gemini:", genAIError);
      return res.status(500).json({ error: "Error generating analysis using AI model" });
    }

  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: error.message || "Error analyzing resume" });
  }
};
