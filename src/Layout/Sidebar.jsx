import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  FolderIcon,
  PlusIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { setSelectedProject, addProject } from '../store/slices/tasksSlice.js';
import { toggleSidebar } from '../store/slices/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { projects, selectedProject, tasks } = useSelector(state => state.tasks);
  const { sidebarOpen } = useSelector(state => state.ui);

  const getProjectTaskCount = (project) => {
    if (project === 'all') return tasks.length;
    return tasks.filter(task => task.project === project).length;
  };

  const handleAddProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName && projectName.trim()) {
      dispatch(addProject(projectName.trim()));
    }
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => dispatch(toggleSidebar())}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 lg:relative lg:shadow-none"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Taskly
                </h2>
                <button
                  onClick={() => dispatch(toggleSidebar())}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 p-6 space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                  <nav className="space-y-2">
                    <button
                      onClick={() => dispatch(setSelectedProject('all'))}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        selectedProject === 'all'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <HomeIcon className="w-5 h-5" />
                      <span>All Tasks</span>
                      <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                        {getProjectTaskCount('all')}
                      </span>
                    </button>
                  </nav>
                </div>

                {/* Projects */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Projects
                    </h3>
                    <button
                      onClick={handleAddProject}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <PlusIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  <nav className="space-y-2">
                    {projects.map((project) => (
                      <motion.button
                        key={project}
                        whileHover={{ x: 4 }}
                        onClick={() => dispatch(setSelectedProject(project))}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          selectedProject === project
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <FolderIcon className="w-5 h-5" />
                        <span>{project}</span>
                        <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                          {getProjectTaskCount(project)}
                        </span>
                      </motion.button>
                    ))}
                  </nav>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h3>
                  <nav className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <ChartBarIcon className="w-5 h-5" />
                      <span>Analytics</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Cog6ToothIcon className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;