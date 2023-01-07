import React from "react";
import { NavLink } from "react-router-dom";
import { hashShortener } from "sdk/iconSDK";
import imgTotalProduct from "../../assets/img/image-removebg-preview.png";

const Creator = ({ to, address, avatar, totalProducts }) => {
	return (
		<NavLink to={to}>
			<div className="w-full creator h-[80px] bg-[#869BDF] bg-opacity-[15%] border border-[#535488] border-opacity-40  rounded-[4px] flex items-center px-[9px] justify-between hover:-translate-y-1 transition-all">
				<div className="flex flex-row items-center gap-[7px]">
					<img
						src={
							avatar ||
							"https://www.chuphinhsanpham.vn/wp-content/uploads/2022/02/chup-hinh-cv-profile-hcm-0004.jpg"
						}
						alt=""
						className="w-[70px] h-[55px] rounded-[5px] object-cover"
					/>
					<div className="flex flex-col">
						<span className="text-[12px] font-medium">
							{hashShortener(address)}
						</span>
						<div className="flex items-center justify-start gap-2">
							<img className="w-3" src={imgTotalProduct} alt="" />
							<span className="text-[10px] font-medium">
								{totalProducts} NFTs
							</span>
						</div>
					</div>
				</div>

				<span>...</span>
			</div>
		</NavLink>
	);
};

export default Creator;
