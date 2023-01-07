import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({ placeholder = "", className = "" }) => {
	const { toggle, show } = useDropdown();
	return (
		<div
			className={`flex items-center justify-between p-[15px] drop-down-select bg-[#04040c] border border-[#535488] border-opacity-40 rounded cursor-pointer text-sm ${className}`}
			onClick={toggle}
		>
			<span>{placeholder}</span>
			<span>
				{show ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 15l7-7 7 7"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				)}
			</span>
		</div>
	);
};

export default Select;
