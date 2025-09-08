import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "./store/slices/tasksSlice";
import { loadUIState } from "./store/slices/uiSlice";

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  const { tasks, projects } = useSelector((state) => state.tasks);
  const { darkMode, sidebarOpen } = useSelector((state) => state.ui);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("taskManager_tasks")) || [];
    const savedProjects = JSON.parse(localStorage.getItem("taskManager_projects")) || [];
    const savedUI = JSON.parse(localStorage.getItem("taskManager_ui")) || {};

    dispatch(loadTasks({ tasks: savedTasks, projects: savedProjects }));
    dispatch(loadUIState(savedUI));
  }, [dispatch]);

  // Save everything whenever state changes
  useEffect(() => {
    localStorage.setItem("taskManager_tasks", JSON.stringify(tasks));
    localStorage.setItem("taskManager_projects", JSON.stringify(projects));
    localStorage.setItem(
      "taskManager_ui",
      JSON.stringify({ darkMode, sidebarOpen })
    );
  
  }, [tasks, projects, darkMode, sidebarOpen]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
};
