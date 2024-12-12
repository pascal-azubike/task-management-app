import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import logo from '../assets/logo-white.png';

/**
 * Top navigation bar component providing app-wide navigation.
 * Contains the app logo, navigation links, and theme toggle functionality.
 * Remains fixed at the top while scrolling.
 */
const Navbar: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-zinc-900/80' : 'bg-white/80'} backdrop-blur-lg`}>
      <div className="px-4 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-lg p-1.5 ${isDarkMode ? '' : 'bg-zinc-900'}`}>
            <img 
              src={logo} 
              alt="Task Management Logo" 
              className="h-8 w-auto"
            />
          </div>
          <span className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-800'}`}>
            TaskMaster
          </span>
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar; 