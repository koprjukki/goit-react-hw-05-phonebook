import React from "react";
import { ContactListElement } from "../ContactListElement/ContactListElement";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import slide from "../../animations/slide.module.css";

export const ContactList = ({ contacts, onContactDelete }) => {
	return (
		<TransitionGroup component="ul">
			{contacts.map(({ id, name, number }) => {
				return (
					<CSSTransition
						key={id}
						timeout={500}
						classNames={slide}
						unmountOnExit
					>
						<ContactListElement
							name={name}
							key={id}
							number={number}
							onDelete={() => onContactDelete(id)}
						/>
					</CSSTransition>
				);
			})}
		</TransitionGroup>
	);
};

ContactList.defaultProps = {
	contacts: [],
};

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		}),
	).isRequired,
	onContactDelete: PropTypes.func.isRequired,
};
