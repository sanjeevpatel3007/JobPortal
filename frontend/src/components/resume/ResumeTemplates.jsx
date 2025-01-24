import React from 'react';
import { motion } from 'framer-motion';
import { Check, Layout, Clock, Sparkles } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    image: '/templates/modern.png',
    description: 'Clean and professional design with a modern touch',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-blue-500 to-purple-600'
  },
  {
    id: 'classic',
    name: 'Classic',
    image: '/templates/classic.png',
    description: 'Traditional resume format, perfect for formal applications',
    icon: Layout,
    color: 'bg-gradient-to-br from-green-500 to-teal-600'
  },
  {
    id: 'creative',
    name: 'Creative',
    image: '/templates/creative.png',
    description: 'Stand out with a unique and creative layout',
    icon: Clock,
    color: 'bg-gradient-to-br from-orange-500 to-pink-600'
  }
];

const ResumeTemplates = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Choose Your Resume Template
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Select a template that best represents your professional style
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300
              ${selectedTemplate === template.id 
                ? 'ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' 
                : 'hover:shadow-xl'}`}
            onClick={() => onSelectTemplate(template.id)}
          >
            {/* Template Icon Header */}
            <div className={`${template.color} p-4 flex items-center justify-between`}>
              <template.icon className="w-6 h-6 text-white" />
              {selectedTemplate === template.id && (
                <div className="bg-white rounded-full p-1">
                  <Check className="w-4 h-4 text-blue-500" />
                </div>
              )}
            </div>

            {/* Template Preview */}
            <div className="relative aspect-[3/4] bg-white dark:bg-gray-800">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium">Click to select</p>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {template.description}
              </p>
            </div>

            {/* Selection Overlay */}
            {selectedTemplate === template.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-blue-500/10 pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Template Selection Info */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-green-600 dark:text-green-400 font-medium">
            ✓ {templates.find(t => t.id === selectedTemplate)?.name} template selected
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeTemplates; 