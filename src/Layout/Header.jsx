import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { toggleSidebar, toggleDarkMode, openTaskModal } from '../store/slices/uiSlice';
import { openLoginModal, logout } from '../store/slices/authSlice';
import { setSearchQuery } from '../store/slices/tasksSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.ui);
  const { searchQuery } = useSelector(state => state.tasks);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(openTaskModal())}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Task</span>
          </motion.button>

          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
              <button
                onClick={() => dispatch(logout())}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <UserCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(openLoginModal())}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;