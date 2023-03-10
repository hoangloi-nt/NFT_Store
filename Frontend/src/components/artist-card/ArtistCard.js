import { Button } from "components/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { hashShortener } from "sdk/iconSDK";

const artistCard = ({ to, name, address, avatar, products, isYou }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = useTranslation();
	return (
		<div className="flip-card artist">
			<div className="flip-card-inner">
				<div className="front">
					<div className="mx-auto card w-[190px] h-[250px] md:w-[210px] md:h-[270px] lg:w-[280px]  lg:h-[323px] bg-[#869BDF] bg-opacity-[15%] border border-[#535488] border-opacity-40 rounded-lg hover:-translate-y-1 transition-all flex flex-col justify-center items-center gap-y-10">
						<img
							src={
								avatar ||
								"https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-71.jpg"
							}
							alt=""
							className="object-cover w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] mx-auto rounded-full"
						/>

						<div className="flex items-center justify-center leading-none gap-x-3">
							<span className="text-base font-semibold md:text-xl">{name}</span>
							{isYou && (
								<div className="px-3 py-2 font-semibold text-white bg-green-500 rounded-xl">
									{t("artistPage.you")}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="back">
					<div className="card mx-auto w-[190px] h-[250px] md:w-[210px] md:h-[270px] lg:w-[280px]  lg:h-[323px] bg-[#869BDF] bg-opacity-[15%] border border-[#535488] border-opacity-40 rounded-lg hover:-translate-y-1 transition-all flex flex-col justify-center items-center gap-y-5">
						<img
							src={
								avatar ||
								"https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-71.jpg"
							}
							alt=""
							className="object-cover hidden lg:block w-[80px] h-[80px] mx-auto rounded-full"
						/>
						<div className="flex items-center justify-center text-sm lg:text-lg gap-x-3">
							<span>
								{t("name")}: <strong>{name}</strong> <br></br>
								{t("address")}: <strong>{hashShortener(address)}</strong>{" "}
								<br></br>
								{t("products")}: <strong>{products}</strong> <br></br>
							</span>
						</div>
						<div className="flex flex-col items-center justify-center gap-y-4">
							{isYou && (
								<Button
									type="button"
									kind="primary"
									className="!text-sm !bg-[#171a2b]"
									height={"36px"}
									to={"/profile"}
								>
									{t("artistPage.updateBtn")}
								</Button>
							)}

							{to && (
								<Button
									type="button"
									kind="primary"
									className="!text-sm !bg-[#171a2b]"
									height={"36px"}
									to={to}
								>
									{t("artistPage.viewBtn")}
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default artistCard;
