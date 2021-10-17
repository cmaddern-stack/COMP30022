import React from "react";
import "../../css/Header.css";
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
            dark: "inactive",
            currentTheme: localStorage.getItem("theme"),
        };
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-theme");
        } 
    };
    


    onClick = () => {
        if (localStorage.getItem("theme") === "light") {
            localStorage.setItem("theme", "dark");
            document.body.classList.add("dark-theme");
            this.setState({
                mode: "on",
                light: "inactive",
                dark: "active"
            });
        } else if (localStorage.getItem("theme") === "dark") {
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark-theme");
            this.setState({
                mode: "off",
                light: "active",
                dark: "inactive"
            });
        } else {
            localStorage.setItem("theme", "light");
        }
    };


    render() {
        return (
            <div className={"icon " + localStorage.getItem("theme")} onClick={this.onClick}>
                <FaMoon className={"moon-" + localStorage.getItem("theme") + " {this.state.dark}"}/>
                <FaSun className={"sun-" + localStorage.getItem("theme") + " {this.state.light}"}/>
            </div>
        );
    }
}

export default DarkModeToggle;

