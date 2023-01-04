import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="text-sm p-[15px] cursor-pointer flex items-center justify-between hover:text-primary transition-all"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
