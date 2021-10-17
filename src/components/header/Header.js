import React from "react";
import ProfileIcon from "./ProfileIcon";
import "../../css/Header.css";
import NotificationIcon from "./NotificationIcon";
import PopularityCounter from "./PopularityCounter";
import DarkModeToggle from "./DarkModeToggle";

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
                        {/* <a href="/groups">Logo and App Name</a> */}
                        <a href="/groups"><img id="logo" src="knotwork-02.png"></img></a>
                    </div>
                    <div className="right-header">
                        <PopularityCounter />
                        <DarkModeToggle />
                        <NotificationIcon />
                        <ProfileIcon />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
