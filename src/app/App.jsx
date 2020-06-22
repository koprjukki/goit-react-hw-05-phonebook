import React, { Component } from "react";
import "./_app.sass";

import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Button } from "../components/Button/Button";
import { Loader } from "../components/Loader/Loader";
import PixabayApi from "../api/PixabayApi";

export default class App extends Component {
	state = {
		dataFromQuery: [],
		page: 0,
		query: "",
		isLoading: false,
	};

	componentDidUpdate(prevProps, prevState) {
		const { page, query } = this.state;
		if (prevState.page !== page || prevState.query !== query) {
			if (query !== "") {
				this.getData({ page, query });
			}
		}
	}

	handleOnClick = () => {
		const { page } = this.state;
		this.setState({ page: page + 1 });
	};

	handleOnSubmit = (e) => {
		this.setState({ dataFromQuery: [], query: e, page: 1 });
	};

	getData = ({ query, page }) => {
		const { dataFromQuery } = this.state;
		const scrollToHeight = document.documentElement.scrollHeight - 120;
		this.setState({ isLoading: true });

		return PixabayApi({ query, page })
			.then(({ data }) =>
				this.setState({ dataFromQuery: [...dataFromQuery, ...data.hits] }),
			)
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
				if (page > 1)
					window.scrollTo({
						top: scrollToHeight,
						behavior: "smooth",
					});
			});
	};

	render() {
		const { dataFromQuery, isLoading } = this.state;

		return (
			<div className="App">
				<Searchbar onSubmit={this.handleOnSubmit} />
				<ImageGallery data={dataFromQuery} />
				{isLoading && <Loader />}
				{dataFromQuery.length > 0 && <Button onClick={this.handleOnClick} />}
			</div>
		);
	}
}
