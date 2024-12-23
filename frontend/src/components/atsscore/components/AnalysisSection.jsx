import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function AnalysisSection({ analysis }) {
  return (
    <div className="md:col-span-2 space-y-6">
      <StrengthsSection analysis={analysis} />
      <WeaknessesSection analysis={analysis} />
      <RecommendationsSection analysis={analysis} />
    </div>
  );
}

function StrengthsSection({ analysis }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Strengths</h2>
      <div className="space-y-4">
        {analysis
          .filter(item => item.title?.toLowerCase().includes('strength'))
          .map((strength, index) => (
            <AnalysisItem 
              key={index} 
              icon={<FaCheck className="text-green-500 text-sm" />}
              bgColor="bg-green-100"
              text={strength.description}
            />
          ))}
      </div>
    </div>
  );
}

function WeaknessesSection({ analysis }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
      <div className="space-y-4">
        {analysis
          .filter(item => item.title?.toLowerCase().includes('weakness'))
          .map((weakness, index) => (
            <AnalysisItem 
              key={index} 
              icon={<FaTimes className="text-red-500 text-sm" />}
              bgColor="bg-red-100"
              text={weakness.description}
            />
          ))}
      </div>
    </div>
  );
}

function RecommendationsSection({ analysis }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      <div className="space-y-4">
        {analysis
          .filter(item => item.title?.toLowerCase().includes('recommend'))
          .map((rec, index) => (
            <AnalysisItem 
              key={index} 
              icon={<span className="text-blue-500 text-sm font-bold">{index + 1}</span>}
              bgColor="bg-blue-100"
              text={rec.description}
            />
          ))}
      </div>
    </div>
  );
}

function AnalysisItem({ icon, bgColor, text }) {
  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0 w-6 h-6 ${bgColor} rounded-full flex items-center justify-center mr-3 mt-1`}>
        {icon}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
} 