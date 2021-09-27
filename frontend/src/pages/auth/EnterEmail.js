import React from "react";
import InputField from "../../components/InputField";
import AuthController from "../../controllers/AuthController";

class EnterEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: "",
            emailValid: false,
        };
    }

    changeHandler = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        let result = await AuthController.emailChangeHandler(this.state.email);
        this.setState({
            emailError: result.error,
            emailValid: result.valid,
        });
    };

    // CHECK IF EMAIL IS ASSOCIATED WITH AN EXISTING ACCOUNT
    // IF YES, PUSH LOGIN PAGE, ELSE PUSH SIGNUP PAGE
    nextHandler = async (event) => {
        let data = { email: this.state.email };
        // redirect to login or sign up pages
        const authApi = require("../../apis/authApi");
        let response = await authApi.checkEmail(this.state.email);
        let exists = response.success;
        var path = "";
        if (exists) {
            path = "/auth/login";
        } else {
            path = "/auth/signup";
        }
        this.props.history.push({ pathname: path, state: data });
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
                    onChange={this.changeHandler}
                    disabled="false"
                    error={this.state.emailError}
                />
                <div className="button-row">
                    <button
                        className="invisible-button"
                        type="button"
                        name="next"
                        disabled={!this.state.emailValid}
                        onClick={this.nextHandler}
                    >
                        NEXT
                    </button>
                    <button
                        className="primary-button"
                        type="button"
                        name="next"
                        disabled={!this.state.emailValid}
                        onClick={this.nextHandler}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        );
    }
}

export default EnterEmail;
