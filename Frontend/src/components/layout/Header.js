import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { DarkMode } from "../DarkMode";
import {
	connectWallet,
	hashShortener,
	disConnect,
	getBalance,
} from "../../sdk/iconSDK.js";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useEffect } from "react";
import { useAuth } from "components/contexts/auth-context";
import Swal from "sweetalert2";

import { useTranslation } from "react-i18next";
import Search from "./search/Search";

const Header = () => {
	const { t, i18n } = useTranslation();
	const [address, setAddress] = useState(localStorage.getItem("address"));
	const { show, setShow, nodeRef } = useClickOutSide();
	const {
		show: showMobile,
		setShow: setShowMobile,
		nodeRef: nodeRefMobile,
	} = useClickOutSide();

	const [price, setPrice] = useState("");
	const navigate = useNavigate();

	const { userInfo } = useAuth();
	document.body.classList.add(localStorage.getItem("theme"));
	useEffect(() => {
		async function getPrice() {
			const price = await getBalance(address);
			setPrice(price);
		}
		getPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const disConnectHandle = () => {
		Swal.fire({
			title: t("disconnect-modal.titleDisconnect"),
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: t("disconnect-modal.noDisconnect"),
			confirmButtonText: t("disconnect-modal.yesDisconnect"),
		}).then((result) => {
			if (result.isConfirmed) {
				disConnect(setAddress);
				navigate("/");
				Swal.fire(
					t("disconnect-modal.disconnect"),
					t("disconnect-modal.textConfirm"),
					"success",
				);
			}
		});
	};
	const handleChangeLanguage = async () => {
		const inputOptions = new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					en: "English",
					vn: "Vietnamese",
				});
			}, 500);
		});

		const { value: lang } = await Swal.fire({
			title: "Select language",
			input: "radio",
			inputOptions: inputOptions,
			inputValidator: (value) => {
				if (!value) {
					return "You need to choose something!";
				}
			},
		});

		if (lang) {
			Swal.fire({
				html: `You selected: ${lang === "en" ? "English" : "Vietnamese"}`,
			});
		}

		i18n.changeLanguage(lang);
		localStorage &&
			localStorage.setItem("language", JSON.stringify(lang || "en"));
	};

	const menuLinks = [
		{
			url: "/",
			title: t("home"),
		},
		{
			url: "/marketplace",
			title: t("marketplace"),
		},
		{
			url: "/artist",
			title: t("artist"),
		},
		{
			url: "/collection",
			title: t("collection"),
		},
	];

	return (
		<>
			<header className="hidden lg:block">
				<div className="container !py-5 items-center justify-between gap-x-12 hidden lg:flex">
					<NavLink to="/">
						<img srcSet="/Logo.png 2x" alt="logo" className="logo" />
					</NavLink>
					<ul className="flex items-center justify-center transition-all menu gap-x-5">
						{menuLinks.map((item) => (
							<li className="" key={item.title}>
								<NavLink
									to={item.url}
									className={({ isActive }) =>
										isActive ? "text-bold" : "hover:opacity-75"
									}
								>
									{item.title}
								</NavLink>
							</li>
						))}
					</ul>

					<Search />

					<div>
						{address ? (
							<div className="flex items-center justify-center gap-x-3">
								<div className="w-10 h-10 avatar">
									<img
										src={
											userInfo.avatar ||
											"https://vcdn-sohoa.vnecdn.net/2022/03/08/bored-ape-nft-accidental-0-728-5490-8163-1646708401.jpg"
										}
										alt=""
										className="object-cover w-full h-full rounded-full"
									/>
								</div>
								<span
									className="relative text-gray-400 cursor-pointer address-user"
									onClick={() => setShow(!show)}
									ref={nodeRef}
								>
									{hashShortener(address)}
									<div className="font-medium text-white">
										{parseFloat(price).toFixed(4)} ICX
									</div>
									{show && (
										<div className="absolute flex justify-center items-start flex-col bg-white w-[200px] rounded-sm overflow-hidden translate-y-2 z-10">
											<span
												className="w-full p-3 hover:bg-slate-500 hover:text-white "
												onClick={handleChangeLanguage}
											>
												{t("changeName")}
											</span>
											<div className="w-full hover:bg-slate-500 hover:text-white">
												<DarkMode />
											</div>
											<span className="w-full p-3 hover:bg-slate-500 hover:text-white">
												<NavLink to={"/create"}>{t("createNFT")}</NavLink>
											</span>
											<span className="w-full p-3 hover:bg-slate-500 hover:text-white">
												<NavLink to={"/profile"}>{t("profile")}</NavLink>
											</span>
											<Button
												kind="primary"
												className="w-full !rounded-tl-none !rounded-tr-none text-white !bg-red-500"
												onClick={disConnectHandle}
											>
												{t("disconnect")}
											</Button>
										</div>
									)}
								</span>
							</div>
						) : (
							<Button
								kind="primary"
								className="w-[150px]"
								onClick={() => connectWallet(setAddress)}
							>
								{t("connect")}
							</Button>
						)}
					</div>
				</div>
			</header>

			<header className="sticky top-0 z-50 bg-[#04040c] lg:hidden">
				{showMobile && (
					<div className="fixed m-auto inset-0 flex justify-center items-start flex-col bg-white w-[200px] h-[240px] rounded-sm overflow-hidden z-20 text-black">
						<span
							className="w-full p-3 hover:bg-slate-500 hover:text-white "
							onClick={handleChangeLanguage}
						>
							{t("changeName")}
						</span>
						<div className="w-full hover:bg-slate-500 hover:text-white">
							<DarkMode />
						</div>
						<span className="w-full p-3 hover:bg-slate-500 hover:text-white">
							<NavLink to={"/create"}>{t("createNFT")}</NavLink>
						</span>
						<span className="w-full p-3 hover:bg-slate-500 hover:text-white">
							<NavLink to={"/profile"}>{t("profile")}</NavLink>
						</span>
						<Button
							kind="primary"
							className="w-full !rounded-tl-none !rounded-tr-none text-white !bg-red-500"
							onClick={disConnectHandle}
						>
							{t("disconnect")}
						</Button>
					</div>
				)}
				<div className="flex justify-between w-full p-5 mx-auto">
					<div className="flex items-center justify-start cursor-pointer gap-x-2">
						<NavLink to={"/"}>
							<img srcset="/Logo.png 2.5x" alt="Logo" className="logo" />
						</NavLink>
					</div>
					<input
						hidden
						type="checkbox"
						className="nav__input"
						id="nav-mobile-input"
					/>
					<label for="nav-mobile-input" className="z-50 label-moblie">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</label>

					<label for="nav-mobile-input" className="overlay"></label>

					<div className="menu-content">
						<ul>
							{menuLinks.map((item) => (
								<li className="" key={item.title}>
									<NavLink
										to={item.url}
										className={({ isActive }) =>
											isActive ? "text-bold" : "hover:opacity-75"
										}
									>
										{item.title}
									</NavLink>
								</li>
							))}
						</ul>

						<div className="absolute w-full md:w-[80%] bottom-20">
							<div className="mt-20 mb-5 px-[30px] py-[10px]">
								<div>
									{address ? (
										<div className="flex items-center justify-start gap-x-3">
											<div className="w-10 h-10 avatar">
												<img
													src={
														userInfo.avatar ||
														"https://vcdn-sohoa.vnecdn.net/2022/03/08/bored-ape-nft-accidental-0-728-5490-8163-1646708401.jpg"
													}
													alt=""
													className="object-cover w-full h-full rounded-full"
												/>
											</div>
											<span
												className="text-gray-400 cursor-pointer address-user"
												onClick={() => setShowMobile(!showMobile)}
												ref={nodeRefMobile}
											>
												{hashShortener(address)}
												<div className="font-medium text-white">
													{parseFloat(price).toFixed(4)} ICX
												</div>
											</span>
										</div>
									) : (
										<Button
											kind="primary"
											className="w-[150px]"
											onClick={() => connectWallet(setAddress)}
										>
											{t("connect")}
										</Button>
									)}
								</div>
							</div>

							<Search />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
