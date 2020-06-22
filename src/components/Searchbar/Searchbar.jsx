import React, { Component } from "react";
import PropTypes from "prop-types";

export class Searchbar extends Component {
	state = {
		inputValue: "",
	};

	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	reset = () => {
		this.setState({ inputValue: "" });
	};

	handleChange = (e) => {
		const inputValue = e.target.value;
		this.setState({ inputValue: inputValue });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { onSubmit } = this.props;
		const { inputValue } = this.state;
		onSubmit(inputValue);
		this.reset();
	};

	render() {
		const { inputValue } = this.state;
		return (
			<header className="Searchbar">
				<form className="SearchForm" onSubmit={this.handleSubmit}>
					<button type="submit" className="SearchForm-button">
						<span className="SearchForm-button-label">Search</span>
					</button>
					<input
						type="text"
						autoFocus
						autoComplete="off"
						placeholder="Search images and photos"
						className="SearchForm-input"
						onChange={this.handleChange}
						value={inputValue}
					/>
				</form>
			</header>
		);
	}
}
