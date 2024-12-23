import AuthCTA from "@/components/auth/AuthCTA";
import InterviewCTA from "@/components/auth/InterviewCTA";
import React, { useState } from "react";

const ViewResumeTemplate = () => {
  const templates = [
    {
      name: "Modern",
      imgSrc: "/templates/modern.png",
    },
    {
      name: "Classic",
      imgSrc: "/templates/classic.png",
    },
    {
      name: "Creative",
      imgSrc: "/templates/creative.png",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start  lg:space-x-8">
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-6 lg:text-left text-center"> See Multiple Resume Template</h1>
          <div className="flex lg:flex-col justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => setSelectedTemplate(template)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  selectedTemplate.name === template.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {template.name}
              </button>
            ))}
            <div>
                <AuthCTA/>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 text-center  lg:text-left">
          <img
            src={selectedTemplate.imgSrc}
            alt={`${selectedTemplate.name} Template`}
            className="w-full max-w-md mx-auto lg:mx-0 h-auto rounded-lg shadow-lg"
          />
          <h2 className="text-xl font-semibold mt-4">{selectedTemplate.name} Template</h2>
          <div>
            <InterviewCTA/>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default ViewResumeTemplate;
