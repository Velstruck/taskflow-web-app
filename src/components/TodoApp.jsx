import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import WeatherWidget from './WeatherWidget';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { darkMode, sidebarOpen } = useSelector(state => state.ui);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className={`
            fixed lg:static lg:block z-10 transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <WeatherWidget />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <TaskInput />
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;