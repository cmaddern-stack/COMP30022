import React from 'react';
import './ContactsOptionsBar.css'
import ContactsViewButton from "./ContactsViewButton";
import SearchBar from "./SearchBar";

class ContactsOptionsBar extends React.Component {
    render() {
        return (
            <div className="options-bar">
                <div className="left-items">
                    <ContactsViewButton/>
                </div>
                <div className="right-items">
                    <SearchBar/>
                    <button className="primary-button">ADD CONTACT</button>
                </div>
            </div>
        );
    }
}

export default ContactsOptionsBar;

