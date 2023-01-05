import { Button } from "components/button";
import React, { useEffect } from "react";

const NotFoundPage = () => {
	useEffect(() => {
		document.title = "Not Found Page";
	}, []);
	return (
		<div className="container flex flex-col items-center justify-center">
			<img
				src="https://i.ibb.co/MkjvG1K/pngtree-error-404-page-not-found-png-image-2598541-removebg-preview.png"
				alt="Not Found Page"
				border="0"
			/>
			<div className="mb-10 text-xl font-semibold text-center md:text-2xl">
				Sorry, we can't find the page you're looking for!
			</div>
			<Button type="button" kind="primary" to={"/"}>
				Go to Homepage
			</Button>
		</div>
	);
};

export default NotFoundPage;
