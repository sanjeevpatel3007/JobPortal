import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Brain, ArrowRight } from 'lucide-react';

export const InterviewCTA = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Interview Practice",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "Smart Feedback",
      color: "text-purple-500"
    },
    {
      icon: Sparkles,
      title: "Personalized Tips",
      color: "text-pink-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Practice Interviews with AI
        </h3>
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ x: -2 }}
        >
          <ArrowRight className="w-5 h-5 text-indigo-500" />
        </motion.div>
      </div>

      <div className="flex gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex-1 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <feature.icon className={`w-4 h-4 ${feature.color}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {feature.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-xl" />
    </motion.div>
  );
};

export default InterviewCTA;
