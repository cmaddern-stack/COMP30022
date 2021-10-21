import React from "react";
import InputField from "../../components/InputField";
import AuthController from "../../controllers/AuthController";
import AuthAPI from "../../apis/authApi";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.location.state.email,
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            emailError: "",
            firstNameError: "",
            lastNameError: "",
            passwordError: "",
            confirmPasswordError: "",
            emailValid: true,
            firstNameValid: false,
            lastNameValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            errorMessage:
                "Email already associated with existing account. Try again with a different email address. ",
            failed: "",
        };
    }

    emailChangeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        let result = await AuthController.emailChangeHandler(this.state.email);
        this.setState({
            emailError: result.error,
            emailValid: result.valid,
        });
    };

    nameChangeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        let error = event.target.name + "Error";
        let valid = event.target.name + "Valid";
        let result = await AuthController.nameChangeHandler(event.target.value);
        this.setState({
            [error]: result.error,
            [valid]: result.valid,
        });
    };

    passwordChangeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        let result = await AuthController.passwordChangeHandler(
            event.target.value
        );
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
            this.state.password,
            this.state.confirmPassword
        );
        this.setState({
            confirmPasswordError: result.error,
            confirmPasswordValid: result.valid,
        });
    };

    proceed = () => {
        return (
            this.state.emailValid &&
            this.state.firstNameValid &&
            this.state.lastNameValid &&
            this.state.passwordValid &&
            this.state.confirmPasswordValid
        );
    };

    backHandler = async (event) => {
        this.props.history.goBack();
    };

    nextHandler = async (event) => {
        // redirect to home page
        let response = await AuthAPI.signup({
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
        });
        if (response && response.success) {
            await AuthController.loginUser(response);
            sessionStorage.setItem("username", response.username);
            sessionStorage.setItem("password", this.state.password);
            this.props.history.push("/groups");
        } else {
            this.setState({
                failed: this.state.errorMessage,
                emailValid: false,
            });
        }
    };

    render() {
        return (
            <div className="auth-form">
                <div>
                    <InputField
                        name="email"
                        value={this.state.email}
                        label="Email Address"
                        placeholder="e.g. jane.doe@gmail.com"
                        type="email"
                        onChange={this.emailChangeHandler}
                        disabled="false"
                        error={this.state.emailError}
                    />
                    <InputField
                        name="firstName"
                        value={this.state.firstName}
                        label="First Name"
                        placeholder="e.g. Jane"
                        type="text"
                        onChange={this.nameChangeHandler}
                        disabled="false"
                        error={this.state.firstNameError}
                    />
                    <InputField
                        name="lastName"
                        value={this.state.lasttName}
                        label="Last Name"
                        placeholder="e.g. Doe"
                        type="text"
                        onChange={this.nameChangeHandler}
                        disabled="false"
                        error={this.state.lastNameError}
                    />
                    <InputField
                        name="password"
                        value={this.state.password}
                        label="Password"
                        placeholder="*************"
                        type="password"
                        onChange={this.passwordChangeHandler}
                        disabled="false"
                        error={this.state.passwordError}
                    />
                    <InputField
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        label="Confirm Password"
                        placeholder="*************"
                        type="password"
                        onChange={this.confirmPasswordChangeHandler}
                        disabled="false"
                        error={this.state.confirmPasswordError}
                    />
                </div>
                <div className="input-error">{this.state.failed}</div>
                <div className="button-row">
                    <button
                        className="button secondary-button"
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
                        disabled={!this.proceed()}
                        onClick={this.nextHandler}
                    >
                        SIGN UP
                    </button>
                </div>
            </div>
        );
    }
}

export default SignUp;
