import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  return (
    <div className="p-8 flex gap-8">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        {/* Profile */}
        <div className="text-center mb-6">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
            />
          )}
          <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          <div className="flex items-center gap-4">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded"
              >
                <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {skill.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-3">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">
                  {edu.graduationDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Professional Summary</h2>
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                <div className="mt-2 text-gray-600">
                  {exp.description.split('•').filter(Boolean).map((point, i) => (
                    <p key={i} className="mb-1">• {point.trim()}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <span className="text-sm text-gray-500">{project.duration}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{project.technologies}</p>
                <p className="text-gray-600">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate; 