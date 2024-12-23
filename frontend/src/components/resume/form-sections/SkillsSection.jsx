import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Slider } from '../../ui/slider';

const SkillsSection = ({ formData, handleSkillChange, addSkill, removeSkill }) => {
  const handleSkillUpdate = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    
    // Initialize skill if it doesn't exist
    if (!updatedSkills[index]) {
      updatedSkills[index] = {
        name: '',
        percentage: 0
      };
    }

    // Update the appropriate field
    if (field === 'name') {
      updatedSkills[index].name = value;
    } else if (field === 'percentage') {
      updatedSkills[index].percentage = value;
    }

    handleSkillChange(updatedSkills);
  };

  return (
    <section className="space-y-6">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Skills</h2>
        <Button 
          type="button" 
          onClick={addSkill} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </div>

      <div className="grid gap-4">
        {formData.skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="flex-1 space-y-4">
              <Input
                value={skill.name || ''}
                onChange={(e) => handleSkillUpdate(index, 'name', e.target.value)}
                placeholder="e.g., React, Node.js, Python"
                className="w-full"
              />
              
              <div className="flex items-center gap-4">
                <Slider
                  value={[skill.percentage || 0]}
                  onValueChange={([value]) => handleSkillUpdate(index, 'percentage', value)}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12 text-gray-700 dark:text-gray-300">
                  {skill.percentage || 0}%
                </span>
              </div>
            </div>

            {formData.skills.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSkill(index)}
                className="self-start"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {formData.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No skills added yet. Click "Add Skill" to get started.
        </div>
      )}
    </section>
  );
};

export default SkillsSection; 