import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Building } from 'lucide-react';

const CreativeTemplate = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header with gradient and profile */}
        <header className="relative mb-12 pb-8 border-b-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-8">
            {personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
                {personalInfo.fullName}
              </h1>
              <div className="grid grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-blue-600">
                    <Mail className="w-4 h-4" />
                    <span>{personalInfo.email}</span>
                  </a>
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
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-700">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {personalInfo.portfolio && (
                    <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-700">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Summary */}
            {summary && (
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">About Me</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
              </section>
            )}

            {/* Experience */}
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-700">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Building className="w-4 h-4" />
                          <span>{exp.company}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 space-y-2">
                      {exp.description.split('•').filter(Boolean).map((point, i) => (
                        <p key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{point.trim()}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">Projects</h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{project.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.split(',').map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm inline-flex items-center">
                        View Project <Globe className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Skills & Education */}
          <div className="space-y-8">
            {/* Skills - Updated */}
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 group-hover:from-indigo-500 group-hover:to-purple-500"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-blue-200 dark:border-blue-700 pl-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{edu.graduationDate}</span>
                      {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate; 