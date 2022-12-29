import { Category } from "components/category";
import React, { useEffect } from "react";
import { Button } from "../components/button";
import Skull from "../img/Skull.png";
import logos from "../img/LineLogo.png";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const [creators, setCreators] = useState(0);
  const [products, setProducts] = useState(0);

  useEffect(() => {
    async function getAllData() {
      const data = await axios.all([
        axios.get("http://localhost:1337/creators/count"),
        axios.get("http://localhost:1337/products/count"),
      ]);
      setCreators(data[0].data);
      setProducts(data[1].data);
    }
    getAllData();
    document.title = "NFT Store Homepage";
  }, []);
  return (
    <div className="container">
      <div className="flex items-center justify-between mt-10">
        <div>
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bc61f3] to-[#5c43f6]">
            {t("homepage.title1")}
            <br></br> {t("homepage.title2")}
          </div>
          <div className="mt-4 mb-10 text-base">{t("homepage.desc")}</div>
          <Button
            kind="primary"
            height={"56px"}
            width={"200px"}
            to={"/marketplace"}
          >
            {t("homepage.mainBtn")}
          </Button>
          <div className="flex items-center mt-10 gap-x-48">
            <div>
              <div className="text-5xl font-bold">{products}</div>
              <div>NFTs</div>
            </div>
            <div>
              <div className="text-5xl font-bold">{creators}</div>
              <div>{t("homepage.artist")}</div>
            </div>
          </div>
        </div>
        <img srcSet={`${Skull} 2x`} alt="Skull NFT" />
      </div>
      <div className="relative flex items-center justify-center mt-32 mb-10">
        <img src={logos} alt="Icon logos" />
        <div className="w-[400px] rounded-full h-[400px] bg-white absolute left-[-20%] z-[-1] opacity-20 blur-[80px]"></div>
      </div>

      <div className="flex flex-col justify-center border-t border-t-zinc-400 border-opacity-20">
        <div className="my-10 text-3xl font-bold text-left">
          {t("homepage.hot")}
        </div>
        <Category />
      </div>
    </div>
  );
};

export default HomePage;
