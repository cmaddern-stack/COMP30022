import React from 'react';
import './ContactsOptionsBar.css'
import ContactsViewButton from "./ContactsViewButton";
import SearchBar from "./SearchBar";
import { FontAwesome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

/*
    Contacts Options Bar 
    refers to the bar on top of the contacts views below the Nav bar
    - Allows users to switch between Group view and Contacts view
    - Allows users to sort and filter
    - Allows users to search
    - Allows users to Add new contact by clicking on the button
 */

class ContactsOptionsBar extends React.Component {
    render() {
        return (
            <div className="options-bar">
                <div className="left-items">
                    <ContactsViewButton />
                </div>
                <div className="right-items">
                    <SearchBar />
                    <button
                        className="primary-button"
                        id="add-contact-button"
                        onClick={this.newContactOnclick}
                    >
                        NEW CONTACT
                    </button>
                    <button
                        className="primary-button"
                        id="add-contact-button-small"
                        onClick={this.newContactOnclick}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        );
    }
}

export default ContactsOptionsBar;

