import React from "react";
import ProfileIcon from "./ProfileIcon";
import "./Header.css";
import { FontAwesome } from "react-icons/fa";
import { FaMoon, FaBell } from "react-icons/fa";

export default function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="left-header">
                    <a href="/">Logo and App Name</a>
                </div>
                <div className="right-header">
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
