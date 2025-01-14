import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, updateTodoPriority, toggleTodoComplete } from '../store/slices/todoSlice';
import { Search } from 'lucide-react';

const TaskList = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const filteredTodos = sortedTodos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tasks</h2>
      <div className="flex items-center mb-4">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="space-y-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodoComplete(todo.id))}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </span>
                <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {todo.text}
                </span>
                {todo.dueDate && (
                  <span className="text-sm text-gray-500">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={todo.priority}
                  onChange={(e) => dispatch(updateTodoPriority({ id: todo.id, priority: e.target.value }))}
                  className="p-1 text-sm border rounded focus:ring-2 focus:ring-green-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;