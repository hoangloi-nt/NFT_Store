import React from "react";
import PropTypes from "prop-types";

const Toggle = (props) => {
  const { id, on, onClick, ...rest } = props;

  return (
    <label>
      <input
        id={id}
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[60px] h-[32px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-gradient-to-r from-[#bc61f3] to-[#5c43f6]" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[24px] h-[24px] bg-white rounded-full inline-block ${
            on ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toggle;
