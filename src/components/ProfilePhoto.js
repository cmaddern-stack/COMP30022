import React from "react";
import axios from "axios";
import "../css/Profile.css";
import { FontAwesome } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

/**
 * Profile photo icon which can be found on the profile page
 * - Displayes user's current profile photo
 * - On click, file selector opens and user can select a new profile photo
 * props:
 * - src
 * - alt
 * - firstName
 * - lastName
 */

class ProfilePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.hiddenInputRef = React.createRef();
    }

    onHiddenInputClick = async (event) => {
        this.props.onChange(event);
    };

    onFileSelect = (event) => {
        this.hiddenInputRef.current.click();
    };

    getInitials = () => {
        return (
            (this.props.firstName && this.props.firstName[0]) +
            (this.props.lastName && this.props.lastName[0])
        );
    };

    render() {
        return (
            <div className="profile-photo-row">
                <div className="profile-photo" onClick={this.onFileSelect}>
                    {this.props.src === "" ? (
                        <div className="large-profile-initials">
                            <div className="large-initials">
                                {this.getInitials()}
                            </div>
                        </div>
                    ) : (
                        <img src={this.props.src} alt={this.props.alt}></img>
                    )}
                    {/* <div className="overlay-icon">
                        <FaCamera />
                    </div> */}
                    <input
                        className="invisible-button"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={this.onHiddenInputClick}
                        ref={this.hiddenInputRef}
                    />
                </div>
            </div>
        );
    }
}

export default ProfilePhoto;
