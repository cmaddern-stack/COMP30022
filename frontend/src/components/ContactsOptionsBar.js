import React from 'react';
import './ContactsOptionsBar.css'
import ContactsViewButton from "./ContactsViewButton";
import SearchBar from "./SearchBar";

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

