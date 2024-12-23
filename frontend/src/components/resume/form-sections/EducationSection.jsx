import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Plus, Trash2 } from 'lucide-react';

const EducationSection = ({ formData, handleEducationChange, addEducation, removeEducation }) => {
  return (
    <section>
      <div className='flex justify-between'>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Education</h2>
      <div className="flex justify-between items-center mb-4">
        <Button type="button" onClick={addEducation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>
      </div>
      
      {formData.education.map((edu, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Degree</Label>
              <Input
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div>
              <Label>School</Label>
              <Input
                name="school"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="University Name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={edu.location}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="City, State"
              />
            </div>
            <div>
              <Label>Graduation Date</Label>
              <Input
                name="graduationDate"
                type="month"
                value={edu.graduationDate}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div>
              <Label>GPA</Label>
              <Input
                name="gpa"
                value={edu.gpa}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="3.8"
              />
            </div>
          </div>
          {formData.education.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Remove
            </Button>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationSection; 