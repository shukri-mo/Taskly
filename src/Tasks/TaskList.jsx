import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks, filter, selectedProject, searchQuery, sortBy } = useSelector(state => state.tasks);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by completion status
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by project
    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.project === selectedProject);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, filter, selectedProject, searchQuery, sortBy]);

  if (filteredAndSortedTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {searchQuery 
            ? `No tasks match your search for "${searchQuery}"`
            : filter === 'completed'
            ? "You haven't completed any tasks yet"
            : "Get started by creating your first task"
          }
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {filteredAndSortedTasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;