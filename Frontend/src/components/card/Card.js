import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { hashShortener } from "sdk/iconSDK";

const Card = ({ to, title, image, price, address, avatar }) => {
  const { t } = useTranslation();
  return (
    <NavLink to={to}>
      <div className="card w-[282px] h-[323px] hover:-translate-y-1 transition-all relative flex justify-center items-center flex-col mb-10">
        <img
          src={
            image ||
            "https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-71.jpg"
          }
          alt=""
          className="object-cover w-full h-full mx-auto rounded-lg z-[1]"
        />
        <div className="absolute z-10 bg-white bottom-[-15%] rounded-xl w-[240px] px-5 py-3 shadow-sm shadow-white">
          <div className="flex items-center justify-between">
            <div className="leading-none text-black">
              <span className="text-sm font-bold">{title}</span> <br></br>
              <span className="text-xs">
                {t("created")} <strong> {hashShortener(address)}</strong>
              </span>
            </div>
            <img
              src={
                avatar ||
                "https://www.chuphinhsanpham.vn/wp-content/uploads/2022/02/chup-hinh-cv-profile-hcm-0004.jpg"
              }
              alt=""
              className="rounded-full w-[32px] h-[32px] object-cover"
            />
          </div>
          <div className="flex items-center justify-start gap-2 mt-3">
            <img src="https://i.im.ge/2022/08/07/FR3uFm.Ellipse-6.png" alt="" />
            <span className="text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-[#bc61f3] to-[#5c43f6] font-bold">
              {price} ICX
            </span>
          </div>
        </div>
        <div className="card w-[282px] h-[323px] hover:-translate-y-1 transition-all absolute bg-white inset-0 blur-[4px] opacity-70 z-0 rounded-lg"></div>
      </div>
    </NavLink>
  );
};

export default Card;
