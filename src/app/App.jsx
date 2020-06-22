import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import { ContactForm } from "../components/ContactForm/ContactForm";
import { ContactList } from "../components/ContactList/ContactList";
import { Filter } from "../components/Filter/Filter";
import { CustomAlert } from "../components/CustomAlert/CustomAlert";

import "./_app.sass";
import slide from "../animations/slide.module.css";
import pop from "../animations/pop.module.css";

export default class App extends Component {
	state = {
		contacts: [
			{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
			{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
			{ id: "id-3", name: "Eden Clements", number: "645-17-79" },
			{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
		],
		filter: "",
		isAlerting: false,
		isRendering: false,
		isFilterShown: false,
	};

	componentDidMount() {
		const storage = localStorage.getItem("contacts");
		if (storage !== null) {
			this.setState({
				contacts: JSON.parse(storage),
				isRendering: true,
				isFilterShown: true,
			});
		}
	}

	componentDidUpdate(prevState) {
		const { contacts } = this.state;
		if (prevState.contacts !== contacts) {
			localStorage.setItem("contacts", JSON.stringify(contacts));
		}
	}

	handleAddNewContact = (newContact) => {
		const contactAlreadyExist = this.state.contacts.find(
			(contact) => contact.name === newContact.name,
		);

		if (this.state.contacts.length > 0 && contactAlreadyExist) {
			this.setState({ isAlerting: true });
			this.hideAlert();
		} else if (newContact.name.length > 0 && newContact.number.length > 8) {
			this.setState((prevState) => ({
				contacts: [...prevState.contacts, newContact],
			}));
		} else return alert("Enter valid value!");
	};

	hideAlert = () => {
		setTimeout(() => this.setState({ isAlerting: false }), 2000);
	};

	handleChangeFilter = (filter) => {
		this.setState({ filter });
	};

	handleFilterContacts = () => {
		return this.state.contacts.filter((contact) =>
			contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
		);
	};

	handleDeleteContact = (id) => {
		this.setState((state) => ({
			contacts: state.contacts.filter((contact) => contact.id !== id),
		}));
	};

	render() {
		const { filter, isAlerting, isRendering } = this.state;

		return (
			<>
				<div className="container">
					<CSSTransition
						in={isAlerting}
						timeout={500}
						unmountOnExit
						classNames={slide}
					>
						<CustomAlert />
					</CSSTransition>

					<CSSTransition
						in={isRendering}
						timeout={500}
						unmountOnExit
						classNames={slide}
					>
						<h1>Phonebook</h1>
					</CSSTransition>
					<ContactForm onSubmit={this.handleAddNewContact} />

					<h2>Contacts</h2>
					<CSSTransition
						in={isRendering}
						timeout={250}
						unmountOnExit
						classNames={pop}
					>
						<Filter
							handleChangeFilter={this.handleChangeFilter}
							filteredValue={filter}
						/>
					</CSSTransition>

					<ContactList
						contacts={this.handleFilterContacts()}
						onContactDelete={this.handleDeleteContact}
					/>
				</div>
			</>
		);
	}
}
