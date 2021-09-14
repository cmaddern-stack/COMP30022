import React from "react";
import ProfileIcon from "./ProfileIcon";
import "./Header.css";
import { FontAwesome } from "react-icons/fa";
import { FaMoon, FaBell } from "react-icons/fa";
import PopularityCounter from "./PopularityCounter";

/**
 * Header
 * Displays app logo and name on the top of the screen
 * - Popularity counter shows user how many people have downloaded their contact information
 * - Moon to toggle light/dark mode
 * - Bell to view notifications
 * - Profile picture, when clicked shows dropdown navigation menu
 */
class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="header-content">
                    <div className="left-header">
                        <a href="/">Logo and App Name</a>
                    </div>
                    <div className="right-header">
                        <PopularityCounter/>
                        <div className="icon">
                            <FaMoon />
                        </div>
                        <div className="icon">
                            <FaBell />
                        </div>
                        <ProfileIcon />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;