import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Plus, Trash2, Wand2 } from 'lucide-react';

const ExperienceSection = ({ 
  formData, 
  handleExperienceChange, 
  addExperience, 
  removeExperience,
  generateDescription,
  aiLoading 
}) => {
  return (
    <section>
      <div className='flex justify-between'>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Experience</h2>
      <div className="flex justify-between items-center mb-4">
        <Button type="button" onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>
      </div>
      {formData.experience.map((exp, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Company Name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={exp.location}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="City, State"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Start Date</Label>
                <Input
                  name="startDate"
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  name="endDate"
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Brief description of your role and responsibilities"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => generateDescription(index, 'experience')}
                disabled={aiLoading || !exp.title || !exp.company}
                className="flex-shrink-0"
                title="Generate description"
              >
                <Wand2 className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          {formData.experience.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Remove
            </Button>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection; 