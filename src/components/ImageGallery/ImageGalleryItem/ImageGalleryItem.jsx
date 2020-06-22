import React, { Component } from "react";
import { Modal } from "../../Modal/Modal";
import PropTypes from "prop-types";

export class ImageGalleryItem extends Component {
	state = {
		isModalOpen: false,
	};

	static propTypes = {
		data: PropTypes.shape({
			id: PropTypes.number.isRequired,
			webformatURL: PropTypes.string.isRequired,
			tags: PropTypes.string.isRequired,
		}).isRequired,
	};

	handleOpenModal = () => {
		this.setState({ isModalOpen: true });
	};

	handleCloseModal = () => this.setState({ isModalOpen: false });

	render() {
		const { data } = this.props;
		const { isModalOpen } = this.state;
		return (
			<>
				<li className="ImageGalleryItem" onClick={this.handleOpenModal}>
					<img
						id={data.id}
						src={data.webformatURL}
						alt={data.tags}
						className="ImageGalleryItem-image"
					/>
				</li>
				{isModalOpen && (
					<Modal onClose={this.handleCloseModal}>
						<img src={data.largeImageURL} alt={data.tags} />
					</Modal>
				)}
			</>
		);
	}
}
