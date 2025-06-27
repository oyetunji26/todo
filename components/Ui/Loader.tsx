import React from "react";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-black">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-dashed border-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-dotted border-fuchsia-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-4 border-solid border-yellow-400 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default Loader;