import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Download, Share2 } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const ResumeView = ({ resumeData, template = 'modern' }) => {
  const renderTemplate = () => {
    const templateProps = { data: resumeData };

    switch (template) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"
    >
      {/* Header Actions */}
      <div className="flex justify-end gap-4 p-4 border-b dark:border-gray-700">
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Resume Content - Same data, different template */}
      <div className="print:p-0">
        {renderTemplate()}
      </div>
    </motion.div>
  );
};

export default ResumeView;
