import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ATS_RESUME_SCORE_END_POINT } from '@/utils/constant';
import { motion } from 'framer-motion';
import FileUpload from './components/FileUpload';
import ScoreCard from './components/ScoreCard';
import AnalysisSection from './components/AnalysisSection';
import CTASection from './components/CTASection';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function AtsHome() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type.includes('document'))) {
      setFile(uploadedFile);
      setError(null);
      await analyzeResume(uploadedFile);
    } else {
      setError('Please upload a PDF or Word document');
    }
  };

  const analyzeResume = async (resumeFile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', resumeFile);

      const response = await fetch(ATS_RESUME_SCORE_END_POINT, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let extractedScore = data.score;
      if (!extractedScore && data.analysis) {
        const scoreItem = data.analysis.find(item => 
          item.title?.toLowerCase().includes('score') || 
          item.description?.toLowerCase().includes('score')
        );
        if (scoreItem) {
          const scoreMatch = scoreItem.description.match(/(\d+)\s*(?:out of|\/)\s*100/);
          if (scoreMatch) {
            extractedScore = parseInt(scoreMatch[1]);
          }
        }
      }
      setScore(extractedScore || 75);
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Error analyzing resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ATS Resume Scorer</h1>
          <p className="text-lg text-gray-600">
            Upload your resume to get an ATS compatibility score and detailed analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FileUpload onFileUpload={handleFileUpload} />
        </motion.div>
        <div>
        {/* <CTASection /> */}

        </div>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">Analyzing your resume...</p>
          </motion.div>
        )}

        {/* <CTASection /> */}
        {score && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScoreCard score={score} />
              <AnalysisSection analysis={analysis} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* <CTASection /> */}
            </motion.div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4"
          >
            <p className="text-red-600">{error}</p>
          </motion.div>
        )}
        <CTASection />
      </div>
    </div>
  );
}
