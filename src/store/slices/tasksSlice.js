import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  projects: ['Personal', 'Work', 'Shopping', 'Health'],
  filter: 'all', // all, active, completed
  selectedProject: 'all',
  searchQuery: '',
  sortBy: 'dueDate', // dueDate, priority, created
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        priority: action.payload.priority || 'medium',
        project: action.payload.project || 'Personal',
        dueDate: action.payload.dueDate || null,
        tags: action.payload.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
      }
    },
    
    reorderTasks: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedTask = state.tasks[dragIndex];
      state.tasks.splice(dragIndex, 1);
      state.tasks.splice(hoverIndex, 0, draggedTask);
    },
    
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    
    addProject: (state, action) => {
      if (!state.projects.includes(action.payload)) {
        state.projects.push(action.payload);
      }
    },
    
    loadTasks: (state, action) => {
      state.tasks = action.payload.tasks || [];
      state.projects = action.payload.projects || state.projects;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  reorderTasks,
  setFilter,
  setSelectedProject,
  setSearchQuery,
  setSortBy,
  addProject,
  loadTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;