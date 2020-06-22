import React from "react";
import PropTypes from "prop-types";

export const Button = ({ onClick }) => {
	return (
		<div className="ButtonContainer">
			<button className="Button" onClick={onClick}>
				Load More
			</button>
		</div>
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
};
