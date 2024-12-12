import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * The landing page component that displays the project title and description.
 * This component serves as the main introduction to the Task Management application.
 */
const ProjectInfo: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'gradient-text' : 'text-gray-800'}`}>
        Task Management
      </h1>
      <p className={`text-base mt-3 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'} mb-4`}>
        A modern task management application built with React and Ant Design
      </p>
    </div>
  );
};

export default ProjectInfo; 