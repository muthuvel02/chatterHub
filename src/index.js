import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login';
import Chats from './components/Chats';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </AuthProvider>
  );
};

const rootElement = document.getElementById('root');

// Use ReactDOM.createRoot instead of directly using createRoot
createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
);
