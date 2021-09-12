import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./TwoSelectButton.css";
import {FontAwesome} from "react-icons/fa";
import {FaTable, FaAddressBook} from "react-icons/fa";

class ContactsViewButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftButtonState: "selected",
            rightButtonState: "deselected",
        };
    }

    onClick = (event) => {
        if (this.props.location.pathname === "/contacts") {
            this.setState({
                leftButtonState: "selected",
                rightButtonState: "deselected",
            });
        } else {
            this.setState({
                leftButtonState: "deselected",
                rightButtonState: "selected",
            });
        }
    };

    render() {
        return (
            <div className="two-select-button" onClick={this.onClick}>
                <NavLink
                    className={"left " + this.state.leftButtonState}
                    exact
                    to="/"
                >
                    <FaAddressBook/> Groups
                </NavLink>
                <NavLink
                    className={"right " + this.state.rightButtonState}
                    exact
                    to="/contacts"
                >
                    <FaTable/> Contacts
                </NavLink>
            </div>
        );
    }
}

export default withRouter(ContactsViewButton);
