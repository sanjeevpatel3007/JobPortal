// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons from react-icons
import { MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
    onClick={toggleTheme}
    className="p-2 bg-gray-200 dark:bg-gray-900 rounded-md flex items-center justify-center transition-colors duration-300"
    aria-label="Toggle Theme"
  >
    {theme === 'light' ? (
      <FaMoon className="text-gray-800" size={24} /> // Moon icon for light mode (indicates switching to dark mode)
    ) : (
      <MdLightMode  className="text-yellow-100" size={24} /> // Sun icon for dark mode (indicates switching to light mode)
    )}
  </button>
  );
};

export default ThemeToggle;
