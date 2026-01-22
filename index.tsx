import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './src/screens/Dashboard';
import Logs from './src/screens/Logs';
import Settings from './src/screens/Settings';
import About from './src/screens/About';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="p-4">
        <nav className="flex gap-3 mb-4">
          <Link to="/" className="px-3 py-1 bg-indigo-600 text-white rounded">Dashboard</Link>
          <Link to="/logs" className="px-3 py-1 bg-slate-200 rounded">Logs</Link>
          <Link to="/settings" className="px-3 py-1 bg-slate-200 rounded">Settings</Link>
          <Link to="/about" className="px-3 py-1 bg-slate-200 rounded">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
