import React from "react";
import AuthAPI from "../apis/authApi";
import InputField from "../components/InputField";
import AuthController from "../controllers/AuthController";
import "../css/Settings.css";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            passwordError: "",
            passwordValid: false,
            confirmPasswordError: "",
            confirmPasswordValid: false,
            message: "",
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    passwordChangeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        let result = AuthController.passwordChangeHandler(event.target.value);
        this.setState({
            passwordError: result.error,
            passwordValid: result.valid,
        });
        let confirmPasswordResult =
            await AuthController.confirmPasswordChangeHandler(
                this.state.password,
                this.state.confirmPassword
            );
        this.setState({
            confirmPasswordError: confirmPasswordResult.error,
            confirmPasswordValid: confirmPasswordResult.valid,
        });
    };

    confirmPasswordChangeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        let result = await AuthController.confirmPasswordChangeHandler(
            this.state.newPassword,
            this.state.confirmNewPassword
        );
        this.setState({
            confirmPasswordError: result.error,
            confirmPasswordValid: result.valid,
        });
    };

    resetPassword = async () => {
        const response = await AuthAPI.resetPassword({
            username: sessionStorage.getItem("username"),
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        });
        var message = "";
        if (response.success === true) {
            message = "Password saved successfully.";
        } else {
            message =
                "Reset password could not be completed at this time. Please try again later.";
        }
        this.setState({
            message: message,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            passwordError: "",
            passwordValid: false,
            confirmPasswordError: "",
            confirmPasswordValid: false,
        });
    };

    render() {
        return (
            <div className="settings-page">
                <div className="col left-col">
                    <InputField
                        type="password"
                        name="oldPassword"
                        label="Old Password"
                        placeholder="*********"
                        onChange={this.onChange}
                        value={this.state.oldPassword}
                    ></InputField>
                    <InputField
                        type="password"
                        name="newPassword"
                        label="New Password"
                        placeholder="*********"
                        onChange={this.passwordChangeHandler}
                        value={this.state.newPassword}
                        error={this.state.passwordError}
                    ></InputField>
                    <InputField
                        type="password"
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        placeholder="*********"
                        onChange={this.confirmPasswordChangeHandler}
                        value={this.state.confirmNewPassword}
                        error={this.state.confirmPasswordError}
                    ></InputField>
                    <div className="message">{this.state.message}</div>
                    <div className="button-row">
                        <button
                            className="button invisible-button"
                            type="button"
                            name="next"
                            onClick={this.backHandler}
                        >
                            BACK
                        </button>
                        <button
                            className="button primary-button"
                            type="button"
                            name="next"
                            onClick={this.resetPassword}
                            disabled={
                                !(
                                    this.state.passwordValid &&
                                    this.state.confirmPasswordValid
                                )
                            }
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
