import React from "react";
import "../../css/Header.css";
import { FaSun, FontAwesome } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

/**
 * Dark mode toggle
 * changes app between light and dark mode when pressed
 */

class DarkModeToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "off",
            light: "active",
            dark: "inactive",
            currentTheme: sessionStorage.getItem("theme"),
        };
        if (sessionStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-theme");
        }
    }

    onClick = () => {
        if (sessionStorage.getItem("theme") === "light") {
            sessionStorage.setItem("theme", "dark");
            document.body.classList.add("dark-theme");
            this.setState({
                mode: "on",
                light: "inactive",
                dark: "active",
            });
        } else if (sessionStorage.getItem("theme") === "dark") {
            sessionStorage.setItem("theme", "light");
            document.body.classList.remove("dark-theme");
            this.setState({
                mode: "off",
                light: "active",
                dark: "inactive",
            });
        } else {
            sessionStorage.setItem("theme", "light");
        }
    };

    getIcon = () => {
        if (this.state.mode === "off")
            return (
                <FaSun
                    className={
                        "sun-" +
                        sessionStorage.getItem("theme") +
                        " {this.state.light}"
                    }
                    data-testid="dark-mode-toggle--icon"
                />
            );
        return (
            <FaMoon
                className={
                    "moon-" +
                    sessionStorage.getItem("theme") +
                    " {this.state.dark}"
                }
                data-testid="dark-mode-toggle--icon"
            />
        );
    };

    render() {
        return (
            <div
                className={"icon " + sessionStorage.getItem("theme")}
                onClick={this.onClick}
                data-testid="dark-mode-toggle"
            >
                {this.getIcon()}
            </div>
        );
    }
}

export default DarkModeToggle;
