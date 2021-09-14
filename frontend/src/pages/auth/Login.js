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

    // TODO: CONNECT LOGIN API
    nextHandler = async (event) => {
        // redirect to home page
        let loginAPI = "";
        this.props.history.push("/groups");
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
