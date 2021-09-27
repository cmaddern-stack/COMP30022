import React from "react";
import InputField from "../../components/InputField";
import AuthController from "../../controllers/AuthController";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.location.state.email,
            password: "",
            emailError: "",
            passwordError: "",
            emailValid: true,
            passwordValid: false,
            errorMessage: "Incorrect email address or password. Please try again.",
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

    passwordChangeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        if (event.target.value) {
            this.setState({
                passwordValid: true,
            });
        } else {
            this.setState({
                passwordValid: false,
            });
        }
    };

    proceed = () => {
        return this.state.emailValid && this.state.passwordValid;
    };

    backHandler = async (event) => {
        this.props.history.goBack();
    };

    // CONNECT LOGIN API
    nextHandler = async (event) => {
        // redirect to home page
        const authApi = require("../../apis/authApi");
        let response = await authApi.login({
            email: this.state.email,
            password: this.state.password,
        });
        console.log(response)
        if ("id" in response) {
            sessionStorage.setItem("userId", response.id);
            this.props.history.push("/groups");
        } else {
            this.setState({
                failed: this.state.errorMessage,
            })
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
                        name="password"
                        value={this.state.password}
                        label="Password"
                        placeholder="*************"
                        type="password"
                        onChange={this.passwordChangeHandler}
                        disabled="false"
                        error={this.state.passwordError}
                    />
                </div>
                <div className="input-error">
                    {this.state.failed}
                </div>
                <div className="button-row">
                    <button
                        className="secondary-button"
                        type="button"
                        name="next"
                        onClick={this.backHandler}
                    >
                        BACK
                    </button>
                    <button
                        className="primary-button"
                        type="button"
                        name="next"
                        disabled={!this.proceed()}
                        onClick={this.nextHandler}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
