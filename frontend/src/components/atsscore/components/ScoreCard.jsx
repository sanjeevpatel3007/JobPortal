import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ScoreCard({ score }) {
  const navigate = useNavigate();

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-green-500';
    if (score >= 60) return 'from-yellow-500';
    return 'from-red-500';
  };

  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className={`bg-gradient-to-br ${getScoreBackground(score)} to-blue-600 p-6 text-white`}>
          <h2 className="text-xl font-semibold mb-2">Your Score</h2>
          <div className="text-5xl font-bold">{score}/100</div>
          <div className="mt-2 text-sm opacity-90">
            {score >= 80 ? '12 Issues' : score >= 60 ? '15 Issues' : '20+ Issues'}
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <ScoreMetric label="Content" score={score} percentage={0.4} />
            <ScoreMetric label="Format" score={score} percentage={0.3} />
            <ScoreMetric label="Keywords" score={score} percentage={0.3} />
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/resume-builder')}
        className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        Create ATS-Friendly Resume
        <FaChevronRight className="ml-2" />
      </button>
    </div>
  );
}

function ScoreMetric({ label, score, percentage }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={getScoreColor(score)}>{Math.round(score * percentage)}%</span>
    </div>
  );
} 