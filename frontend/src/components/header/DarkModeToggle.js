import React from "react";
import "./Header.css";
import { FaSun, FontAwesome } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

/**
 * Dark mode toggle
 * changes app between light and dark mode when pressed 
 * TODO: change to dark mode when pressed 
 */
class DarkModeToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "off",
            light: "active",
            dark: "inactive"
        };
    }

    onClick = () => {
        if (this.state.mode === "off") {
            this.setState({
                mode: "on",
                light: "inactive",
                dark: "active"
            });
        } else {
            this.setState({
                mode: "off",
                light: "active",
                dark: "inactive"
            });
        }
    };

    render() {
        return (
            <div className={"icon " + this.state.mode} onClick={this.onClick}>
                <FaMoon className={this.state.dark}/>
                <FaSun className={this.state.light}/>
            </div>
        );
    }
}

export default DarkModeToggle;
