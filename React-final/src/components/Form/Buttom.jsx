import React from 'react';

const Buttom = ({ label, ...props }) => {
  return (
    <button
      className="
    min-w-25 py-3 px-5 mb-4 bg-purple-400 text-purple-900 rounded-md cursor-pointer transition-shadow duration-100 hover:outline-0 hover:shadow-[0_0_0_2px_#e9d4ff,0_0_0_3px_#b9a5cd] focus:outline-0 focus:shadow-[0_0_0_2px_#e9d4ff,0_0_0_3px_#b9a5cd] disabled:opacity-25 disabled:cursor-wait"
      {...props}
    >
      {label}
    </button>
  );
};

export default Buttom;
