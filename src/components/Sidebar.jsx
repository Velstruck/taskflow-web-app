import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

const Sidebar = () => {
  const todos = useSelector((state) => state.todos.todos);
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;

  const data = [
    { name: 'Completed', value: completedTasks },
    { name: 'Remaining', value: totalTasks - completedTasks },
  ];

  const COLORS = ['#10B981', '#E5E7EB'];

  return (
    <div
      className={`w-64 h-screen p-6 shadow-lg ${
        darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold">
          Hi, {user?.email?.split('@')[0] || 'User'}
        </h2>
      </div>

      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 rounded-lg ${
                darkMode
                  ? 'text-gray-200 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <span className="mr-3">📋</span>
              All Tasks
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 rounded-lg ${
                darkMode
                  ? 'text-gray-200 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <span className="mr-3">📅</span>
              Today
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 rounded-lg ${
                darkMode
                  ? 'text-gray-200 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <span className="mr-3">⭐</span>
              Important
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-green-50'
        }`}
      >
        <h3 className="text-sm font-semibold mb-4">Task Progress</h3>
        <div className="flex justify-center">
          <div className="w-32 h-32">
            <PieChart width={128} height={128}>
              <Pie
                data={data}
                cx={64}
                cy={64}
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
