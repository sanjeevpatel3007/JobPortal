import React from 'react';
import { Button } from '../../ui/button';
import { Download, Loader2 } from 'lucide-react';
import ResumeView from '../ResumeView';

const PreviewSection = ({
  selectedTemplate,
  setSelectedTemplate,
  formData,
  summary,
  handleSubmit,
  loading
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Preview & Download
      </h2>
      
      {/* Template Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
          Choose Template Style
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {['modern', 'classic', 'creative'].map((templateType) => (
            <div
              key={templateType}
              onClick={() => setSelectedTemplate(templateType)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all
                ${selectedTemplate === templateType 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
            >
              <div className="aspect-[3/4] relative bg-gray-100 dark:bg-gray-800 rounded-md mb-2">
                <img
                  src={`/templates/${templateType}.png`}
                  alt={`${templateType} template`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <p className="text-center capitalize font-medium">
                {templateType}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Preview */}
      <div className="mb-8">
        <ResumeView 
          resumeData={{
            ...formData,
            summary: summary
          }} 
          template={selectedTemplate}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button 
          type="button"
          variant="outline"
          onClick={() => window.print()}
          disabled={loading}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving Resume...
            </>
          ) : (
            <>
              Save Resume
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default PreviewSection; 