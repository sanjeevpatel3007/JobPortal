import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const ClassicTemplate = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <div className="flex justify-center gap-4 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="flex items-center gap-1 text-blue-600">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} className="flex items-center gap-1 text-blue-600">
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Content sections with traditional styling */}
      <div className="space-y-6">
        {summary && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide border-b mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wide border-b mb-3">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company} | {exp.location}</p>
                  </div>
                  <p className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                </div>
                <div className="text-gray-700">
                  {exp.description.split('•').filter(Boolean).map((point, i) => (
                    <p key={i} className="mb-1">• {point.trim()}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wide border-b mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wide border-b mb-3">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="text-gray-600">{project.duration}</span>
                </div>
                <p className="text-gray-600 mb-2">{project.technologies}</p>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="text-blue-600 hover:underline">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wide border-b mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">{edu.graduationDate}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClassicTemplate; 