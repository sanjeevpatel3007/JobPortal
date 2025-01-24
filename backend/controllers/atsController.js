import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Validate API key on startup
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not configured in environment variables");
}

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retryWithExponentialBackoff = async (operation, retries = MAX_RETRIES, delay = INITIAL_RETRY_DELAY) => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation. Attempts remaining: ${retries-1}`);
      await sleep(delay);
      return retryWithExponentialBackoff(operation, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const resumeFile = req.file;
    if (!resumeFile) {
      console.error("Error: No file uploaded.");
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: "File size exceeds 5MB limit" });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only PDF and Word documents are allowed" });
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
      }

      // Validate extracted text
      if (!resumeText || resumeText.trim().length === 0) {
        return res.status(400).json({ error: "Could not extract text from file. Please ensure the file is not empty or corrupted" });
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
      // Generate analysis using Gemini with retry logic
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const generateAnalysis = async () => {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('AI request timeout')), 30000)
        );
        
        const analysisPromise = model.generateContent(prompt);
        const result = await Promise.race([analysisPromise, timeoutPromise]);
        
        if (!result || !result.response) {
          throw new Error('Empty response from AI model');
        }
        
        const response = result.response;
        const analysisText = response.text();

        if (!analysisText || analysisText.trim().length === 0) {
          throw new Error('Empty analysis text from AI model');
        }

        return analysisText;
      };

      const analysisText = await retryWithExponentialBackoff(generateAnalysis);

      // Parse the response
      const scoreMatch = analysisText.match(/ATS Score:\s*(\d+)\/100/i);
      let score;

      if (scoreMatch) {
        score = parseInt(scoreMatch[1]);
        // Validate score is within range
        if (isNaN(score) || score < 0 || score > 100) {
          throw new Error('Invalid score format from AI model');
        }
      } else {
        // Only use keyword-based scoring as fallback
        console.warn("No explicit ATS score found in the analysis response. Using keyword-based scoring.");
        const keywordMatches = {
          experience: resumeText.match(/experience|worked|managed|led|developed/gi),
          skills: resumeText.match(/skills|proficient|expertise|competent/gi),
          education: resumeText.match(/education|degree|university|college/gi),
          achievements: resumeText.match(/achieved|improved|increased|decreased|reduced/gi),
          contact: resumeText.match(/email|phone|linkedin|github/gi)
        };

        const matchCount = Object.values(keywordMatches)
          .reduce((total, matches) => total + (matches ? matches.length : 0), 0);
        
        // Improved scoring algorithm
        score = Math.min(
          Math.max(
            50 + (matchCount * 5), // Base score plus keyword matches
            Math.ceil(resumeText.length / 100) // Minimum score based on content length
          ),
          100 // Maximum score
        );
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
      
      // Provide more specific error messages
      let errorMessage = "Error generating analysis using AI model";
      if (genAIError.message.includes('timeout')) {
        errorMessage = "Analysis request timed out. Please try again.";
      } else if (genAIError.message.includes('Empty response')) {
        errorMessage = "AI model returned empty response. Please try again.";
      } else if (genAIError.name === 'TypeError') {
        errorMessage = "Invalid response format from AI model. Please try again.";
      }
      
      return res.status(500).json({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? genAIError.message : undefined
      });
    }

  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ 
      error: error.message || "Error analyzing resume",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
