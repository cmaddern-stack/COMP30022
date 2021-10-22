import React from "react";
import { FaBell } from "react-icons/fa";
import "../../css/Header.css";

/**
 * Notification Icon
 * situated on the header between dark mode toggle icon and profile icon
 * When clicked a dropdown of users notifications appears
 */
class NotificationIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: "inactive",
            mode: "off",
            notifications: [],
        };
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 30000);
    }

    async loadData() {
        try {
            // TODO: Notification API call
            // Set this.state.notifications to list of notifications
            // const notificationAPI = "";
            // const res = await fetch(notificationAPI);
        } catch (e) {
            console.log(e);
        }
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

    getDropdown = () => {
        if (this.state.dropdown === "active") {
            return (
                <div className={"dropdown " + this.state.dropdown}>
                    <ul>
                        {this.state.notifications.length === 0 ? (
                            <li>No new notifications</li>
                        ) : (
                            this.state.notifications.map(function (notif) {
                                return <li>{notif}</li>;
                            })
                        )}
                    </ul>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="notification-dropdown">
                <div
                    className={"icon " + this.state.mode}
                    data-testid="notification-icon"
                    onClick={this.toggleMenu}
                >
                    <FaBell />
                </div>
                {this.getDropdown()}
            </div>
        );
    }
}

export default NotificationIcon;
