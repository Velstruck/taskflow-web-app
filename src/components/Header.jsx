import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, toggleViewMode, toggleSidebar } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { LogOut, Menu, Search } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const viewMode = useSelector(state => state.ui.viewMode);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 text-2xl">🌿</span>
            <span className="font-bold text-xl text-gray-800 dark:text-white">TaskFlow</span>
          </div>
        </div>


        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleViewMode())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title={viewMode === 'list' ? 'Switch to card view' : 'Switch to list view'}
          >
            {viewMode === 'list' ? '📑' : '📇'}
          </button>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
          <button
            onClick={() => dispatch(logout())}
            className="px-4 rounded-2xl py-2 bg-red-600 text-white hover:bg-red-700"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;