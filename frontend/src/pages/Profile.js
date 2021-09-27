import React from "react";
import InputField from "../components/InputField";
import CustomInputField from "../components/CustomInputField";
import ProfilePhoto from "../components/ProfilePhoto";
import AuthController from "../controllers/AuthController";
import "./Profile.css";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

/**
 * Profile Page
 * - Shows user their account information
 * - Allows user to modify their account information
 * - Allows user to add custom input fields in the form [{label: "Label 1", value: "Value 1"}, {label: "Label 2", value: "Value 2"}]
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
            customInput: [],
        };
    }

    // TODO: ADD user account fields
    // request user profile data
    async componentDidMount() {
        const profileApi = require("../apis/profileApi");
        const data = await profileApi.getUserProfile();
        this.setState({
            photoURL:
                "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999",
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
        });
    }

    changeHandler = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            buttonDisabled: false,
        });
    };

    customChangeHandler = async (event) => {
        const newCustomInput = this.state.customInput;
        const id = parseInt(event.target.name);
        newCustomInput[id] = {
            label: this.state.customInput[id].label,
            value: event.target.value,
        };
        this.setState({
            customInput: newCustomInput,
            buttonDisabled: false,
        });
    };

    customLabelChangeHandler = async (event) => {
        const newCustomInput = this.state.customInput;
        const id = parseInt(event.target.name);
        newCustomInput[id] = {
            label: event.target.value,
            value: this.state.customInput[id].value,
        };
        this.setState({
            customInput: newCustomInput,
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

    getFields = () => {
        return [
            <InputField
                type="text"
                name="firstName"
                label="First Name"
                placeholder="e.g. Jane"
                onChange={this.changeHandler}
                value={this.state.firstName}
            />,
            <InputField
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="e.g. Doe"
                onChange={this.changeHandler}
                value={this.state.lastName}
            />,
            <InputField
                type="email"
                name="email"
                label="Email Address"
                placeholder="e.g. jane.doe@email.com"
                onChange={this.emailChangeHandler}
                value={this.state.email}
            />,
            <InputField
                type="text"
                name="organisation"
                label="Organisation"
                placeholder="e.g. Hogwarts"
                onChange={this.changeHandler}
                value={this.state.organisation}
            />,
            <InputField
                type="text"
                name="role"
                label="Role"
                placeholder="e.g. Wizard"
                onChange={this.changeHandler}
                value={this.state.role}
            />,
            <InputField
                type="text"
                name="phone"
                label="Phone Number"
                placeholder="e.g. +61 302 203 392"
                onChange={this.changeHandler}
                value={this.state.phone}
            />,
            <InputField
                type="url"
                name="link"
                label="LinkedIn URL"
                placeholder="e.g. linkedin.com/in/jane-doe"
                onChange={this.changeHandler}
                value={this.state.link}
            />,
        ];
    };

    getLeftCol = () => {
        const fields = this.getFields().concat(this.getCustomFields());
        const colLen = Math.floor((fields.length + 1) / 2);
        return fields.slice(0, colLen).map((item) => item);
    };

    getRightCol = () => {
        const fields = this.getFields().concat(this.getCustomFields());
        const colLen = Math.floor((fields.length + 1) / 2);
        return fields.slice(colLen, fields.length).map((item) => item);
    };

    getCustomFields = () => {
        var fields = [];
        for (const [id, item] of this.state.customInput.entries()) {
            fields.push(
                <CustomInputField
                    key={id}
                    listId={id}
                    label={item.label}
                    type="text"
                    placeholder="Enter field value"
                    value={item.value}
                    name={id}
                    onChange={this.customChangeHandler}
                    onLabelChange={this.customLabelChangeHandler}
                    onDeleteChange={this.deleteCustomField}
                />
            );
        }
        return fields;
    };

    addCustomField = () => {
        var newCustomInputs = this.state.customInput;
        newCustomInputs.push({
            label: "Label",
            value: "",
        });
        this.setState({
            customInput: newCustomInputs,
            buttonDisabled: false,
        });
    };

    deleteCustomField = (id) => {
        var newCustomInputs = this.state.customInput;
        newCustomInputs.splice(id, 1);
        this.setState({
            customInput: newCustomInputs,
            buttonDisabled: false,
        });
    };

    // TODO: add more fields
    saveHandler = async (event) => {
        const profileApi = require("../apis/profileApi");
        await profileApi.updateProfile({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
        });
        this.setState({
            buttonDisabled: true,
        });
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
                    <div className="col left-col">{this.getLeftCol()}</div>
                    <div className="col right-col">
                        {this.getRightCol()}
                        <div
                            className="new-field-button"
                            onClick={this.addCustomField}
                        >
                            + New Field
                        </div>
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
