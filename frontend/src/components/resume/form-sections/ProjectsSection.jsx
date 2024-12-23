import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Plus, Trash2, Wand2 } from 'lucide-react';

const ProjectsSection = ({
  formData,
  handleProjectChange,
  addProject,
  removeProject,
  generateDescription,
  aiLoading
}) => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Projects</h2>
        <Button type="button" onClick={addProject} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {formData.projects.map((project, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-6">
          {/* Basic Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Project Name</Label>
              <Input
                name="name"
                value={project.name}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="e.g., E-commerce Platform"
              />
            </div>
            <div>
              <Label>Your Role</Label>
              <Input
                name="role"
                value={project.role}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="e.g., Lead Developer"
              />
            </div>
          </div>

          {/* Technologies and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Technologies Used</Label>
              <Input
                name="technologies"
                value={project.technologies}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                name="duration"
                value={project.duration}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="e.g., 3 months"
              />
            </div>
          </div>

          {/* Project Description with AI */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Project Description</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => generateDescription(index, 'project')}
                disabled={aiLoading || !project.name || !project.technologies}
                title="Generate project description"
              >
                <Wand2 className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                <span className="ml-2">Generate Description</span>
              </Button>
            </div>
            <Textarea
              name="description"
              value={project.description}
              onChange={(e) => handleProjectChange(index, e)}
              placeholder="Provide a comprehensive overview of the project..."
              className="min-h-[100px]"
            />
          </div>

          {/* Project Link */}
          <div>
            <Label>Project Link</Label>
            <Input
              name="link"
              value={project.link}
              onChange={(e) => handleProjectChange(index, e)}
              placeholder="https://github.com/username/project"
            />
          </div>

          {/* Remove Project Button */}
          {formData.projects.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Remove Project
            </Button>
          )}
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection; 