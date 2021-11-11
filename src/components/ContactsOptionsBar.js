import React from "react";
import "../css/ContactsOptionsBar.css";
import ContactsViewButton from "./ContactsViewButton";
import SearchBar from "./SearchBar";
import { FontAwesome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useHistory, Route } from "react-router";
import EditContact from "./EditContact";
import { useLocation } from "react-router-dom";
import { Redirect, withRouter } from "react-router-dom";
import AddContact from "./AddContact";

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";
// const BASE_URL = "http://127.0.0.1:8000/crm/";

/*
    Contacts Options Bar 
    refers to the bar on top of the contacts views below the Nav bar
    - Allows users to switch between Group view and Contacts view
    - Allows users to sort and filter
    - Allows users to search
    - Allows users to Add new contact by clicking on the button
 */

class ContactsOptionsBar extends React.Component {
    constructor() {
        super();

        this.state = {
            info: "",
        };
    }

    nextPath(item) {
        this.props.history.push("/contacts/add");
    }

    newContactOnclick = () => {
        this.props.history.push(
            `${this.props.match.url.replace(/\/$/g, "")}/add/`
        );
    };

    render() {
        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url.replace(/\/$/g, "")}/add/`}
                    component={AddContact}
                ></Route>
                <div className="options-bar">
                    <div className="left-items">
                        <ContactsViewButton />
                    </div>
                    <div className="right-items">
                        {/* <SearchBar /> */}
                        <button
                            className="button primary-button"
                            id="add-contact-button"
                            onClick={this.newContactOnclick}
                        >
                            NEW CONTACT
                        </button>
                        <button
                            className="button primary-button"
                            id="add-contact-button-small"
                            onClick={this.newContactOnclick}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ContactsOptionsBar);
