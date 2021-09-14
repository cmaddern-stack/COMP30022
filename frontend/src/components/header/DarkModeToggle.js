import React from "react";
import "./Header.css";
import { FontAwesome } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

class DarkModeToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "off",
        };
    }

    onClick = () => {
        if (this.state.mode === "off") {
            this.setState({
                mode: "on",
            });
        } else {
            this.setState({
                mode: "off",
            });
        }
    };

    render() {
        return (
            <div className={"icon " + this.state.mode} onClick={this.onClick}>
                <FaMoon />
            </div>
        );
    }
}

export default DarkModeToggle;
