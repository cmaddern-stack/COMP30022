import React from "react";
import "../pages/Profile.css";

class ProfilePhoto extends React.Component {
    render() {
        return (
            <div className="profile-photo-row">
                <img className="profile-photo" src={this.props.src} alt={this.props.alt}></img>
            </div>
        );
    }
}

export default ProfilePhoto;