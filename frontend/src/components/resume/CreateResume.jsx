import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import useGeminiAI from '@/hooks/useGeminiAI';

// Import section components
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import EducationSection from './form-sections/EducationSection';
import ExperienceSection from './form-sections/ExperienceSection';
import SkillsSection from './form-sections/SkillsSection';
import ProjectsSection from './form-sections/ProjectsSection';
import SummarySection from './form-sections/SummarySection';
import PreviewSection from './form-sections/PreviewSection';

// Import constants
import { STEPS } from './constants/steps';

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.PERSONAL);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [summary, setSummary] = useState('');

  const { generateContent, loading: aiLoading } = useGeminiAI();

  // Form state
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      profileImage: ''
    },
    education: [{
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    }],
    experience: [{
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: [{
      name: '',
      percentage: 0
    }],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: '',
      duration: ''
    }]
  });

  // Event handlers
  const handlePersonalInfoChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            profileImage: reader.result
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Education handlers
  const handleEducationChange = (index, e) => {
    const newEducation = formData.education.map((edu, i) => {
      if (i === index) {
        return { ...edu, [e.target.name]: e.target.value };
      }
      return edu;
    });
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
    });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  // Experience handlers
  const handleExperienceChange = (index, e) => {
    const newExperience = formData.experience.map((exp, i) => {
      if (i === index) {
        return { ...exp, [e.target.name]: e.target.value };
      }
      return exp;
    });
    setFormData({ ...formData, experience: newExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    });
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index)
    });
  };

  // Skills handlers
  const handleSkillChange = (updatedSkills) => {
    setFormData(prev => ({
      ...prev,
      skills: updatedSkills.map(skill => ({
        name: skill.name || '',
        percentage: skill.percentage || 0
      }))
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', percentage: 0 }]
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Projects handlers
  const handleProjectChange = (index, e) => {
    const newProjects = formData.projects.map((proj, i) => {
      if (i === index) {
        return { ...proj, [e.target.name]: e.target.value };
      }
      return proj;
    });
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, {
        name: '',
        description: '',
        technologies: '',
        link: '',
        duration: ''
      }]
    });
  };

  const removeProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    });
  };

  // AI Generation handlers
  const generateDescription = async (index, type) => {
    try {
      if (type === 'experience') {
        const exp = formData.experience[index];
        const prompt = `Create a concise professional description for:
          Position: ${exp.title}
          Company: ${exp.company}
          Duration: ${exp.startDate || ''} - ${exp.endDate || 'Present'}`;

        const content = await generateContent(prompt);
        const newExperience = formData.experience.map((exp, i) => {
          if (i === index) {
            return { ...exp, description: content };
          }
          return exp;
        });
        setFormData({ ...formData, experience: newExperience });
      } else if (type === 'project') {
        const project = formData.projects[index];
        const prompt = `Create a concise project description (30-60 words) in 2-3 bullet points for:
          
          Project: ${project.name}
          Technologies: ${project.technologies}
          
          Instructions:
          • Start each point with an action verb
          • Focus on key features and impact
          • Keep it technical but clear
          • Format as bullet points with "•"
          • Total length: 30-60 words
          
          Example format:
          • Developed a scalable e-commerce platform using React and Node.js, implementing secure payment processing
          • Optimized database queries reducing load time by 40%`;

        const content = await generateContent(prompt);
        
        // Clean up the response to ensure proper bullet point format
        const cleanedContent = content
          .split('\n')
          .map(point => point.trim())
          .filter(point => point.length > 0)
          .map(point => point.startsWith('•') ? point : `• ${point}`)
          .join('\n');

        const newProjects = formData.projects.map((proj, i) => {
          if (i === index) {
            return { ...proj, description: cleanedContent };
          }
          return proj;
        });
        setFormData({ ...formData, projects: newProjects });
        toast.success('Project description generated successfully!');
      }
    } catch (error) {
      toast.error('Failed to generate description');
    }
  };

  const generateResumeSummary = async () => {
    try {
      const prompt = `Create a professional summary based on:
        Experience: ${formData.experience.map(exp => `${exp.title} at ${exp.company}`).join(', ')}
        Skills: ${formData.skills.join(', ')}`;

      const content = await generateContent(prompt);
      setSummary(content);
    } catch (error) {
      toast.error('Failed to generate summary');
    }
  };

  // Navigation handlers
  const nextStep = () => {
    let isValid = true;
    
    switch (currentStep) {
      case STEPS.PERSONAL:
        isValid = validatePersonalInfo();
        break;
      case STEPS.EDUCATION:
        isValid = validateEducation();
        break;
      case STEPS.EXPERIENCE:
        isValid = validateExperience();
        break;
      case STEPS.SKILLS:
        isValid = validateSkills();
        break;
      case STEPS.PROJECTS:
        isValid = validateProjects();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      const steps = Object.values(STEPS);
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
        setProgress(((currentIndex + 1) / (steps.length - 1)) * 100);
      }
    }
  };

  const prevStep = () => {
    const steps = Object.values(STEPS);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setProgress((currentIndex - 1) / (steps.length - 1) * 100);
    }
  };

  // Validation functions
  const validatePersonalInfo = () => {
    const { fullName, email, phone } = formData.personalInfo;
    if (!fullName || !email || !phone) {
      toast.error('Please fill in required personal information');
      return false;
    }
    return true;
  };

  const validateEducation = () => {
    const isValid = formData.education.some(edu => edu.degree && edu.school);
    if (!isValid) {
      toast.error('Please add at least one education entry');
    }
    return isValid;
  };

  const validateExperience = () => {
    const isValid = formData.experience.some(exp => exp.title && exp.company);
    if (!isValid) {
      toast.error('Please add at least one experience entry');
    }
    return isValid;
  };

  const validateSkills = () => {
    const isValid = formData.skills.some(skill => skill.name && skill.name.trim() !== '');
    if (!isValid) {
      toast.error('Please add at least one skill');
    }
    return isValid;
  };

  const validateProjects = () => {
    const isValid = formData.projects.some(proj => proj.name && proj.technologies);
    if (!isValid) {
      toast.error('Please add at least one project');
    }
    return isValid;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalResumeData = {
        ...formData,
        summary: summary
      };
      
      console.log('Final Resume Data:', finalResumeData);
      toast.success('Resume created successfully!');
    } catch (error) {
      toast.error('Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.PERSONAL:
        return (
          <PersonalInfoSection
            formData={formData}
            handlePersonalInfoChange={handlePersonalInfoChange}
            handleImageUpload={handleImageUpload}
          />
        );
      case STEPS.EDUCATION:
        return (
          <EducationSection
            formData={formData}
            handleEducationChange={handleEducationChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />
        );
      case STEPS.EXPERIENCE:
        return (
          <ExperienceSection
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
            generateDescription={generateDescription}
            aiLoading={aiLoading}
          />
        );
      case STEPS.SKILLS:
        return (
          <SkillsSection
            formData={formData}
            handleSkillChange={handleSkillChange}
            addSkill={addSkill}
            removeSkill={removeSkill}
            nextStep={nextStep}
          />
        );
      case STEPS.PROJECTS:
        return (
          <ProjectsSection
            formData={formData}
            handleProjectChange={handleProjectChange}
            addProject={addProject}
            removeProject={removeProject}
            generateDescription={generateDescription}
            aiLoading={aiLoading}
          />
        );
      case STEPS.SUMMARY:
        return (
          <SummarySection
            summary={summary}
            setSummary={setSummary}
            generateResumeSummary={generateResumeSummary}
            loading={loading}
            aiLoading={aiLoading}
          />
        );
      case STEPS.PREVIEW:
        return (
          <PreviewSection
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            formData={formData}
            summary={summary}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Resume</h1>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Step {Object.values(STEPS).indexOf(currentStep) + 1} of {Object.values(STEPS).length}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === STEPS.PERSONAL}
              >
                Previous
              </Button>
              {currentStep !== STEPS.PREVIEW && (
                <Button
                  type="button"
                  onClick={nextStep}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateResume;
