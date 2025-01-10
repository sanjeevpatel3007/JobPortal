

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const INITIAL_MESSAGE = "Hello! I'm JobLynk's AI assistant. How can I help you with job searching or career advice?";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: INITIAL_MESSAGE, sender: 'ai' }]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      if (!API_KEY) throw new Error("API key is not set");

      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const prompt = `You are a concise AI assistant for JobLynk, a job search platform. Respond to this question in 2-3 short sentences: ${input}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiMessage = response.text();

      setTimeout(() => {
        setMessages(prev => [...prev, { text: aiMessage, sender: 'ai' }]);
        setIsTyping(false);
      }, 500); // Simulating typing delay
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I can't respond right now. Try again later.", sender: 'ai' }]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full sm:w-80 mb-4"
          >
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold">JobLynk AI Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="h-48 sm:h-64 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <span className="inline-block p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                    >
                      Typing...
                    </motion.span>
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                  placeholder="Type your message..."
                  className="flex-grow px-3 py-2 border rounded-l-lg dark:bg-gray-700 dark:border-gray-600"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer"
      >
        <div className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <MessageCircle size={24} />
        </div>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-white text-blue-500 py-2 px-4 rounded-full shadow-lg ml-2 hidden sm:block"
          >
            How can I help you?
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AIAssistant;
