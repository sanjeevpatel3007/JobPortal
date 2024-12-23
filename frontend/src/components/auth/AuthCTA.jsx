import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

const AuthCTA = () => {
  const features = [
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Create professional resumes with our AI-powered builder",
      color: "from-blue-500 to-indigo-500",
      benefits: ["AI-powered suggestions", "Multiple templates", "ATS-friendly formats"]
    },
    {
      icon: Target,
      title: "ATS Score Checker",
      description: "Optimize your resume for Applicant Tracking Systems",
      color: "from-purple-500 to-pink-500",
      benefits: ["Real-time analysis", "Keyword optimization", "Improvement suggestions"]
    },
    {
      icon: Briefcase,
      title: "Smart Job Finder",
      description: "Find your dream job with our intelligent matching system",
      color: "from-emerald-500 to-teal-500",
      benefits: ["Personalized matches", "One-click apply", "Job alerts"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Powerful tools to help you land your dream job
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 right-0 -z-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 -z-10 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default AuthCTA; 