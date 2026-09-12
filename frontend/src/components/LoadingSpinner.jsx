// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-500">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return <div className="min-h-[60vh] flex items-center justify-center">{spinner}</div>;
  }
  return spinner;
};

export default LoadingSpinner;
