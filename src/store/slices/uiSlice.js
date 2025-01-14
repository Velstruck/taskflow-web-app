import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  viewMode: 'list', // 'list' or 'card'
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'list' ? 'card' : 'list';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleDarkMode, toggleViewMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;