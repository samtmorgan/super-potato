import React from 'react';

export function Tooltip({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <div className="group relative flex">
      {children}
      <span
        className="w-24 absolute top-10 scale-0 transition-all 
      rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100"
      >
        {message}
      </span>
    </div>
  );
}
