// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-8xl font-extrabold gradient-text">404</h1>
    <p className="text-xl text-slate-400 mt-4">Oops! This page doesn't exist.</p>
    <Link to="/" className="btn-primary mt-6">Go Home</Link>
  </div>
);

export default NotFound;
