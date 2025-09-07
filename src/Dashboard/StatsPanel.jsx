import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const StatsPanel = () => {
  const { tasks } = useSelector(state => state.tasks);

  const stats = React.useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      return new Date(task.dueDate) < new Date();
    }).length;
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;

    return { total, completed, pending, overdue, highPriority };
  }, [tasks]);

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ChartBarIcon,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: ClockIcon,
      color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: ExclamationTriangleIcon,
      color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsPanel;