import axios from "axios";
import { ArtistCard } from "components/artist-card";
import { useAuth } from "components/contexts/auth-context";
import { Heading } from "components/heading";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ArtistPage = () => {
	const { t } = useTranslation();
	const { userInfo } = useAuth();
	const [listCreators, setListCreators] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get("http://localhost:1337/creators");
			const results = [];
			response.data.forEach((doc) => {
				if (doc.id !== userInfo.id) {
					results.push(doc);
				}
			});
			setListCreators(results);
		}
		fetchData();
	}, [userInfo.id]);

	useEffect(() => {
		document.title = "Artist Page";
	}, []);

	return (
		<div className="container">
			<Heading title={t("artist")} desc={t("artistPage.text1")}></Heading>
			<div className="grid grid-cols-2 my-20 lg:gap-10 md:grid-cols-3 lg:grid-cols-4">
				<ArtistCard
					name={userInfo.name}
					address={userInfo.address}
					avatar={userInfo.avatar}
					products={userInfo?.create?.length}
					isYou={true}
					to={`/artist/${userInfo.id}`}
				></ArtistCard>
				{listCreators.map((item) => (
					<ArtistCard
						key={item.id}
						name={item.Name}
						address={item.address}
						avatar={item.avatar}
						products={item?.create?.length}
						isYou={false}
						to={`/artist/${item.id}`}
						t={t}
					></ArtistCard>
				))}
			</div>
		</div>
	);
};

export default ArtistPage;
