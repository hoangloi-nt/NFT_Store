import React from "react";

const Glowing = ({ className = "" }) => {
  return (
    <div
      className={`w-[400px] rounded-full h-[400px] bg-white absolute z-[-1] opacity-20 blur-[80px] ${className}`}
    ></div>
  );
};

export default Glowing;
