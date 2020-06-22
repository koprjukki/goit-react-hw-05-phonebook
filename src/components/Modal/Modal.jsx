import React, { Component } from "react";
import PropTypes from "prop-types";

export class Modal extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		children: PropTypes.element.isRequired,
	};

	componentDidMount() {
		window.addEventListener("keydown", this.handleEscCloseModal);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleEscCloseModal);
	}

	handleCloseModal = (e) => {
		const { onClose } = this.props;
		onClose();
	};

	handleEscCloseModal = (e) => {
		const { onClose } = this.props;
		if (e.key !== "Escape") {
			return;
		}
		onClose();
	};

	render() {
		const { children } = this.props;
		return (
			<div className="Overlay" onClick={this.handleCloseModal}>
				<div className="Modal">{children}</div>
			</div>
		);
	}
}
