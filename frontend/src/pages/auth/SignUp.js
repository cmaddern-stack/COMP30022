import React from "react";
import validator from "validator";
import InputField from "../../components/InputField";
import AuthController from "../../controllers/AuthController";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
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

    render() {
        return (
            <div className="auth-form">
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
                    name="password"
                    value={this.state.confirmPassword}
                    label="Confirm Password"
                    placeholder="*************"
                    type="password"
                    onChange={this.confirmPasswordChangeHandler}
                    disabled="false"
                    error={this.state.confirmPasswordError}
                />
            </div>
        );
    }
}

export default SignUp;
