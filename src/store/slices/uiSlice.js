import { createSlice } from '@reduxjs/toolkit';


// uiSlice.js
const savedUI = JSON.parse(localStorage.getItem("taskManager_ui")) || {};

const initialState = {
  darkMode: savedUI.darkMode ?? false,   // respects true/false properly
  sidebarOpen: savedUI.sidebarOpen ?? false,
  showTaskModal: false,
  editingTask: null,
  showStatsPanel: true,
};


const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    openTaskModal: (state, action) => {
      state.showTaskModal = true;
      state.editingTask = action.payload || null;
    },
    
    closeTaskModal: (state) => {
      state.showTaskModal = false;
      state.editingTask = null;
    },
    
    toggleStatsPanel: (state) => {
      state.showStatsPanel = !state.showStatsPanel;
    },
    
   // uiSlice.js
loadUIState: (state, action) => {
  state.darkMode = action.payload.darkMode ?? state.darkMode;
  state.sidebarOpen = action.payload.sidebarOpen ?? state.sidebarOpen;
},

  },
});

export const {
  toggleDarkMode,
  toggleSidebar,
  openTaskModal,
  closeTaskModal,
  toggleStatsPanel,
  loadUIState,
} = uiSlice.actions;

export default uiSlice.reducer;