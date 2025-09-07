import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  sidebarOpen: true,
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
    
    loadUIState: (state, action) => {
      return { ...state, ...action.payload };
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