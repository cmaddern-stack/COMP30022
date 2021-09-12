import React from "react";
import validator from "validator";
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
            emailValid: result.valid
        });
    };

    nextHandler = (event) => {
        // redirect to login or sign up pages
        let emailLookupAPI = "";
        this.props.history.push("/auth/signup");
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
