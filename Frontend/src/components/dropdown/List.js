import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
	const { show } = useDropdown();
	return (
		<>
			{show && (
				<div className="z-20 absolute left-0 w-full drop-down-list bg-[#04040c] border border-[#535488] border-opacity-40 shadow-sm top-full">
					{children}
				</div>
			)}
		</>
	);
};

export default List;
