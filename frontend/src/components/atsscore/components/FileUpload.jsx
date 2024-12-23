import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function FileUpload({ onFileUpload }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          onChange={onFileUpload}
          accept=".pdf,.doc,.docx"
          className="hidden"
          id="resume-upload"
        />
        <label htmlFor="resume-upload" className="cursor-pointer">
          <FaCloudUploadAlt className="text-5xl text-gray-400 mb-3 mx-auto" />
          <p className="text-lg font-medium text-gray-700">Drop your resume here or click to upload</p>
          <p className="text-sm text-gray-500 mt-2">Supports PDF and Word documents</p>
        </label>
      </div>
    </div>
  );
} 