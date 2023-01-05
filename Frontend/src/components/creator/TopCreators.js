import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../button";
import Creator from "./Creator";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 41px;
	align-items: center;
	margin-bottom: 100px;
`;

const TopCreators = () => {
	const { t } = useTranslation();
	const [creators, setCreators] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:1337/creators").then((res) => {
			setCreators(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<Container>
			<h1 className="heading-text">{t("topCreators.title")}</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:grid-cols-3">
				{creators.map((creator) => {
					return (
						<Creator
							key={creator?.id}
							to={"/"}
							address={creator?.address}
							avatar={creator?.avatar}
							totalProducts={creator?.create.length}
						></Creator>
					);
				})}
			</div>
			<Button width={"142px"} height={"39px"} kind="secondary">
				{t("topCreators.watch")}
			</Button>
		</Container>
	);
};

export default TopCreators;
