import React from 'react';

export function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Cercle principal */}
        <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-pulse" 
               style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)' }}>
          </div>
        </div>
        
        {/* Cercles d'onde */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-300 rounded-full animate-ping opacity-10 animation-delay-150"></div>
        
        {/* Point central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
}

export function ButtonLoader() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-150"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-300"></div>
    </div>
  );
}