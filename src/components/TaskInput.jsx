import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/slices/todoSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CirclePlus } from 'lucide-react';
import { Calendar as CalIcon } from 'lucide-react';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTodo({
        id: Date.now(),
        text: task,
        priority,
        completed: false,
        dueDate: dueDate ? dueDate.toISOString() : null,
      }));
      setTask('');
      setDueDate(null);
      setShowCalendar(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
          >
           <CalIcon size={22} className='mx-1' />Due Date
          </button>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
          <CirclePlus size={24}/>
          </button>
        </div>
      </form>
      
      {showCalendar && (
        <div className="absolute z-10 bg-white p-4 rounded-lg shadow-lg">
          <Calendar
            onChange={setDueDate}
            value={dueDate}
            className="rounded-lg border-none"
          />
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowCalendar(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowCalendar(false)}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Set Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInput;