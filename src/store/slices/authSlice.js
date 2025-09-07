import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  showLoginModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.showLoginModal = false;
    },
    
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    
    openLoginModal: (state) => {
      state.showLoginModal = true;
    },
    
    closeLoginModal: (state) => {
      state.showLoginModal = false;
    },
  },
});

export const {
  login,
  logout,
  openLoginModal,
  closeLoginModal,
} = authSlice.actions;

export default authSlice.reducer;