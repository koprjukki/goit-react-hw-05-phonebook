import React from "react";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

export const ImageGallery = ({ data }) => {
	return (
		<ul className="ImageGallery">
			{data.length > 0 &&
				data.map((data) => {
					return <ImageGalleryItem data={data} key={data.id} />;
				})}
		</ul>
	);
};

ImageGallery.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
