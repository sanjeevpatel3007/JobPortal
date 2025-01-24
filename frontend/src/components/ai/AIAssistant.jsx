import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import useGeminiAI from '../../hooks/useGeminiAI';

const suggestionPrompts = [
  {
    title: "Resume Tips",
    prompts: [
      "How can I make my resume stand out?",
      "What are the key elements of a professional resume?",
      "How to write an effective resume summary?",
    ]
  },
  {
    title: "Interview Preparation",
    prompts: [
      "Common interview questions and answers",
      "How to prepare for behavioral interviews?",
      "Tips for virtual interviews",
    ]
  },
  {
    title: "Career Advice",
    prompts: [
      "How to switch careers successfully?",
      "Tips for career growth and advancement",
      "How to negotiate salary?",
    ]
  }
];

const Message = ({ type, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex items-start gap-3 ${type === 'user' ? 'flex-row-reverse' : ''} mb-3`}
  >
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
      type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
    }`}>
      {type === 'user' ? (
        <User className="w-4 h-4 text-white" />
      ) : (
        <Bot className="w-4 h-4 text-white" />
      )}
    </div>
    <div className={`flex-1 max-w-[85%] ${type === 'user' ? 'text-right' : 'text-left'}`}>
      <div className={`inline-block p-2.5 rounded-xl ${
        type === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-white dark:bg-gray-800 shadow-lg'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  </motion.div>
);

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Hello! I\'m your AI career assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const { generateContent, loading } = useGeminiAI();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateContent(input.trim());
      const assistantMessage = {
        type: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'assistant',
        content: "I apologize, but I'm having trouble processing your request at the moment. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-3">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1.5" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powered by Gemini AI
            </span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            AI Career Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Get personalized career guidance, resume tips, and interview preparation help
          </p>
        </motion.div>

        {/* Suggestion Prompts */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {suggestionPrompts.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20"
              >
                <h3 className="text-base font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {category.title}
                </h3>
                <div className="space-y-1.5">
                  {category.prompts.map((prompt, promptIdx) => (
                    <button
                      key={promptIdx}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="w-full text-left text-sm p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-3 md:p-4 border border-white/20">
          {/* Messages */}
          <div className="h-[450px] overflow-y-auto mb-3 px-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <AnimatePresence>
              {messages.map((message, idx) => (
                <Message key={idx} type={message.type} content={message.content} />
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-1.5 text-gray-500"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-3 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows="2"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={`absolute right-2 bottom-2 p-1.5 rounded-lg ${
                loading || !input.trim()
                  ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 