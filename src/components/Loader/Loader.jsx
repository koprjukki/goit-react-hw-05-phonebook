import React from "react";
import LoaderSpin from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loader = () => {
	return (
		<LoaderSpin
			className="Loader"
			type="Oval"
			color="#3f51b5"
			height={300}
			width={300}
		/>
	);
};
