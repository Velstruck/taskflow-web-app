import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './components/Login';
import TodoApp from './components/TodoApp';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoApp />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;