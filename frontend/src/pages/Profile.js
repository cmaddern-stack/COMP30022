import React from "react";
import InputField from "../components/InputField";
import ProfilePhoto from "../components/ProfilePhoto";
import AuthController from "../controllers/AuthController";
import "./Profile.css";

/**
 * Profile Page
 * - Shows user their account information
 * - Allows user to modify their account information
 */
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            photoURL: "",
            firstName: "",
            lastName: "",
            email: "",
            organisation: "",
            role: "",
            phone: "",
            link: "",
            emailError: "",
            emailValid: true,
        };
    }

    // TODO: CONNECT WITH PFOFILE API
    // request user profile data
    componentDidMount() {
        const profileAPI = "";
        // data = await fetch(profileAPI);
        this.setState({
            photoURL:
                "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999",
            firstName: "First Name",
            lastName: "Last Name",
            email: "first.last@gmail.com",
        });
    }

    changeHandler = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            buttonDisabled: false,
        });
    };

    emailChangeHandler = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value,
        });
        let result = await AuthController.emailChangeHandler(this.state.email);
        this.setState({
            emailError: result.error,
            emailValid: result.valid,
            buttonDisabled: false,
        });
    };

    photoChangeHandler = async (event) => {
        // creates temporary URL for selected photo file object
        const selected = URL.createObjectURL(event.target.files[0]);
        this.setState({
            photoURL: selected,
            buttonDisabled: false,
        });
    };

    saveHandler = async (event) => {
        // TODO: post new data using API
    };

    render() {
        return (
            <div className="profile-content">
                <div className="title-row">
                    <h3>Public Information</h3>
                    <div className="info-dropdown">
                        <div className="info">What's this?</div>
                        <div className="tool-tip">
                            Your public information may be downloaded by other
                            users of this application.
                        </div>
                    </div>
                </div>
                <ProfilePhoto
                    src={this.state.photoURL}
                    alt="User Profile Photo"
                    onChange={this.photoChangeHandler}
                />
                <div className="form">
                    <div className="col left-col">
                        <InputField
                            type="text"
                            name="firstName"
                            label="First Name"
                            placeholder="e.g. Jane"
                            onChange={this.changeHandler}
                            value={this.state.firstName}
                        />
                        <InputField
                            type="text"
                            name="lastName"
                            label="Last Name"
                            placeholder="e.g. Doe"
                            onChange={this.changeHandler}
                            value={this.state.lastName}
                        />
                        <InputField
                            type="email"
                            name="email"
                            label="Email Address"
                            placeholder="e.g. jane.doe@email.com"
                            onChange={this.emailChangeHandler}
                            value={this.state.email}
                        />
                        <InputField
                            type="text"
                            name="organisation"
                            label="Organisation"
                            placeholder="e.g. Hogwarts"
                            onChange={this.changeHandler}
                            value={this.state.organisation}
                        />
                    </div>
                    <div className="col right-col">
                        <InputField
                            type="text"
                            name="role"
                            label="Role"
                            placeholder="e.g. Wizard"
                            onChange={this.changeHandler}
                            value={this.state.role}
                        />
                        <InputField
                            type="text"
                            name="phone"
                            label="Phone Number"
                            placeholder="e.g. +61 302 203 392"
                            onChange={this.changeHandler}
                            value={this.state.phone}
                        />
                        <InputField
                            type="url"
                            name="link"
                            label="LinkedIn URL"
                            placeholder="e.g. linkedin.com/in/jane-doe"
                            onChange={this.changeHandler}
                            value={this.state.phone}
                        />
                        <div className="new-field-button">+ New Field</div>
                    </div>
                </div>
                <div className="button-row">
                    <button className="invisible-button" />
                    <button
                        className="primary-button"
                        disabled={this.state.buttonDisabled}
                        onClick={this.saveHandler}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        );
    }
}

export default Profile;
