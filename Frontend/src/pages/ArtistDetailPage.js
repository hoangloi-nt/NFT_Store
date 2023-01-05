import axios from "axios";
import { ArtistCard } from "components/artist-card";
import { useAuth } from "components/contexts/auth-context";
import { Pagination } from "components/pagination";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ArtistDetailPage = () => {
	let lang = JSON.parse(localStorage.getItem("language")) || [];
	const { t } = useTranslation();
	console.log(t);
	const { userInfo } = useAuth();
	const params = useParams();
	const [creatorInfo, setCreatorInfo] = useState({});
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				`http://localhost:1337/creators/${params.id}`,
			);
			setCreatorInfo(response.data);
			const results = [];
			const response2 = await axios.get(`http://localhost:1337/products/`);
			response2.data.forEach((item) => {
				if (item?.createby?.id === creatorInfo.id) {
					results.push(item);
				}
			});

			setProducts(results);
		}
		fetchData();
	}, [creatorInfo.id, params.id]);
	return (
		<div className="mx-auto my-10">
			<h1 className="font-semibold !text-center text-xl mb-10">
				{lang === "en" ? (
					<span>{creatorInfo.Name}'s products collection</span>
				) : (
					<span>Bộ sưu tập của {creatorInfo.Name}</span>
				)}
			</h1>
			<div className="container flex flex-col flex-wrap items-center lg:items-start lg:flex-row gap-x-8">
				<div className="w-[282px]">
					<ArtistCard
						name={creatorInfo.Name}
						address={creatorInfo.address}
						avatar={creatorInfo.avatar}
						products={creatorInfo?.create?.length}
						isYou={creatorInfo.id === userInfo.id}
					></ArtistCard>
				</div>
				<div className="flex-1">
					<Pagination
						items={products}
						className="md:!grid-cols-3 !grid-cols-2 !gap-4 lg:!gap-10"
						amount={9}
					></Pagination>
				</div>
			</div>
		</div>
	);
};

export default ArtistDetailPage;
