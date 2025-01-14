import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
  'todos/fetchWeather',
  async (city) => {
   
    const response = await axios.get(
      `https://wttr.in/${city}?format=j1`
    );
    return response.data;
  }
);

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  weather: null,
  status: 'idle',
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodoPriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.priority = priority;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    toggleTodoComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo, updateTodoPriority, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;