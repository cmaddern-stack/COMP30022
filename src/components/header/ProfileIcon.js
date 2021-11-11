import React from "react";
import "../../css/Header.css";
import ProfileAPI from "../../apis/profileApi";

/**
 * Profile Icon
 * Icon on the nav bar which displays users profile picture,
 * which is specified by the url.
 * When clicked, shows user navigation menu
 */
class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999",
            dropdown: "inactive",
            mode: "off",
        };
    }

    toggleMenu = () => {
        if (this.state.dropdown === "inactive") {
            this.setState({
                dropdown: "active",
                mode: "on",
            });
        } else {
            this.setState({
                dropdown: "inactive",
                mode: "off",
            });
        }
    };

    logout = () => {
        sessionStorage.clear();
    };

    getNavMenu = () => {
        if (this.state.dropdown === "active") {
            return (
                <div className={"dropdown " + this.state.dropdown}>
                    <ul>
                        <a href="/groups">
                            <li>Home</li>
                        </a>
                        <a href="/profile">
                            <li>Profile</li>
                        </a>
                        {/* <a href="/events">
                            <li>Events</li>
                        </a> */}
                        <a href="/settings">
                            <li>Settings</li>
                        </a>
                        <a href="/auth/logout">
                            <li onClick={this.logout}>Logout</li>
                        </a>
                    </ul>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="profile-dropdown">
                <img
                    className={"profile-icon " + this.state.mode}
                    src={this.state.url}
                    alt="User profile picture"
                    onClick={this.toggleMenu}
                ></img>
                {this.getNavMenu()}
            </div>
        );
    }
}

export default ProfileIcon;
