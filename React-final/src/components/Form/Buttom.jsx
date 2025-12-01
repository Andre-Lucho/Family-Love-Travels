import React from 'react';

const Buttom = ({ label, ...props }) => {
  return (
    <button className="py-2 px-4 mb-4 bg-purple-500 rounded-md cursor-pointer">
      {label}
    </button>
  );
};

export default Buttom;
