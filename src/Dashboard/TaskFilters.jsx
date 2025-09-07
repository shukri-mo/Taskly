import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  QueueListIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { setFilter, setSortBy } from '../../store/slices/tasksSlice';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { filter, sortBy } = useSelector(state => state.tasks);

  const filters = [
    { id: 'all', label: 'All Tasks', icon: QueueListIcon },
    { id: 'active', label: 'Active', icon: ClockIcon },
    { id: 'completed', label: 'Completed', icon: CheckCircleIcon },
  ];

  const sortOptions = [
    { id: 'dueDate', label: 'Due Date' },
    { id: 'priority', label: 'Priority' },
    { id: 'created', label: 'Created' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Filter buttons */}
      <div className="flex items-center space-x-2">
        {filters.map((filterOption) => (
          <motion.button
            key={filterOption.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(setFilter(filterOption.id))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              filter === filterOption.id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <filterOption.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{filterOption.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center space-x-2">
        <FunnelIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              Sort by {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;