import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    image: '/templates/modern.png', // Add template preview images
    description: 'Clean and professional design with a modern touch'
  },
  {
    id: 'classic',
    name: 'Classic',
    image: '/templates/classic.png',
    description: 'Traditional resume format, perfect for formal applications'
  },
  {
    id: 'creative',
    name: 'Creative',
    image: '/templates/creative.png',
    description: 'Stand out with a unique and creative layout'
  }
];

const ResumeTemplates = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-lg overflow-hidden border-2 cursor-pointer
            ${selectedTemplate === template.id 
              ? 'border-blue-500 shadow-lg' 
              : 'border-gray-200 dark:border-gray-700'}`}
          onClick={() => onSelectTemplate(template.id)}
        >
          {/* Template Preview */}
          <div className="aspect-[3/4] relative">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-full object-cover"
            />
            {selectedTemplate === template.id && (
              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                <div className="bg-blue-500 rounded-full p-2">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Template Info */}
          <div className="p-4 bg-white dark:bg-gray-800">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {template.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {template.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ResumeTemplates; 