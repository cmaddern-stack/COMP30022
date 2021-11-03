import React from "react";
import { withRouter } from "react-router-dom";
import "../css/TwoSelectButton.css";
import { FaTable, FaAddressBook } from "react-icons/fa";

/*
    Contacts View Button
    refers to the toggle button that allows users to select 
    Group View or Contacts View 
    |  Group  | Contacts |
 */

class ContactsViewButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftButtonState: "",
            rightButtonState: "",
            leftLink: "/groups",
            rightLink: "/contacts",
        };
    }

    componentDidMount() {
        if (this.props.history.location.pathname === this.state.rightLink) {
            this.setState({
                leftButtonState: "deselected",
                rightButtonState: "selected",
            });
        } else {
            this.setState({
                leftButtonState: "selected",
                rightButtonState: "deselected",
            });
        }
    }

    leftOnClick = async () => {
        if (this.props.history.location.pathname !== this.state.leftLink) {
            this.props.history.push(this.state.leftLink);
            this.setState({
                leftButtonState: "selected",
                rightButtonState: "deselected",
            });
        }
    };

    rightOnClick = async () => {
        if (this.props.history.location.pathname !== this.state.rightLink) {
            this.props.history.push(this.state.rightLink);
            this.setState({
                leftButtonState: "deselected",
                rightButtonState: "selected",
            });
        }
    };

    render() {
        return (
            <div className="two-select-button">
                <div
                    className={"left " + this.state.leftButtonState}
                    onClick={this.leftOnClick}
                >
                    <FaAddressBook /> <span className="text-color">Groups</span>
                </div>
                <div
                    className={"right " + this.state.rightButtonState}
                    onClick={this.rightOnClick}
                >
                    <FaTable /> <span className="text-color">Contacts</span>
                </div>
            </div>
        );
    }
}

export default withRouter(ContactsViewButton);
