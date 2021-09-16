import React from "react";
import "../pages/Profile.css";
import { FontAwesome } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

class ProfilePhoto extends React.Component {
    

    render() {
        return (
            <div className="profile-photo-row">
                <div className="profile-photo">
                    <img
                        src={this.props.src}
                        alt={this.props.alt}
                    ></img>
                    <div className="overlay-icon">
                        <FaCamera/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePhoto;
