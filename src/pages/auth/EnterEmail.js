import React from "react";
import InputField from "../../components/InputField";
import AuthController from "../../controllers/AuthController";
import AuthAPI from "../../apis/authApi";

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

    render() {
        return (
            <div className="auth-form">
                <img
                    className="logo auth-logo"
                    src="knotwork-textonly.png"
                ></img>
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
                        disabled={true}
                    ></button>
                    <button
                        className="button primary-button"
                        type="button"
                        name="next"
                        disabled={!this.state.emailValid}
                        onClick={() =>
                            AuthController.enterEmailNext(
                                this.props.history,
                                this.state.email
                            )
                        }
                    >
                        NEXT
                    </button>
                </div>
            </div>
        );
    }
}

export default EnterEmail;
