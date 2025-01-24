import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Download, Loader2, Eye, EyeOff } from 'lucide-react';
import ResumeView from '../ResumeView';

const PreviewSection = ({
  selectedTemplate,
  setSelectedTemplate,
  formData,
  summary,
  handleSubmit,
  loading
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Preview & Download
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Choose a template and preview your resume before downloading
        </p>
      </div>
      
      {/* Template Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Choose Template Style
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['modern', 'classic', 'creative'].map((templateType) => (
            <div
              key={templateType}
              onClick={() => setSelectedTemplate(templateType)}
              className={`cursor-pointer rounded-lg border-2 p-3 transition-all
                ${selectedTemplate === templateType 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
            >
              <div className="aspect-[3/4] relative bg-gray-100 dark:bg-gray-800 rounded-md mb-2 overflow-hidden">
                <img
                  src={`/templates/${templateType}.png`}
                  alt={`${templateType} template`}
                  className="w-full h-full object-cover rounded-md transition-transform hover:scale-105"
                />
                {selectedTemplate === templateType && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <span className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                      Selected
                    </span>
                  </div>
                )}
              </div>
              <p className="text-center capitalize font-medium text-gray-800 dark:text-gray-200">
                {templateType}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full"
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Show Preview
            </>
          )}
        </Button>
      </div>

      {/* Resume Preview */}
      <div className={`${showPreview || 'hidden lg:block'} transition-all duration-300`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-auto max-h-[600px] mb-6">
          <div className="min-w-[800px] lg:min-w-0">
            <ResumeView 
              resumeData={{
                ...formData,
                summary: summary
              }} 
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          type="button"
          variant="outline"
          onClick={() => window.print()}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
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