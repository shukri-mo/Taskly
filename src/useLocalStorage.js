import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from '../store/slices/tasksSlice';
import { loadUIState } from '../store/slices/uiSlice';

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const projects = useSelector(state => state.tasks.projects);
  const darkMode = useSelector(state => state.ui.darkMode);
  const sidebarOpen = useSelector(state => state.ui.sidebarOpen);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManager_tasks');
    const savedProjects = localStorage.getItem('taskManager_projects');
    const savedUI = localStorage.getItem('taskManager_ui');

    if (savedTasks || savedProjects) {
      dispatch(loadTasks({
        tasks: savedTasks ? JSON.parse(savedTasks) : [],
        projects: savedProjects ? JSON.parse(savedProjects) : undefined,
      }));
    }

    if (savedUI) {
      dispatch(loadUIState(JSON.parse(savedUI)));
    }
  }, [dispatch]);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('taskManager_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem('taskManager_projects', JSON.stringify(projects));
  }, [projects]);

  // Save UI state to localStorage
  useEffect(() => {
    localStorage.setItem('taskManager_ui', JSON.stringify({
      darkMode,
      sidebarOpen,
    }));
  }, [darkMode, sidebarOpen]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
};