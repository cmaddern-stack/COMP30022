import React from "react";
import validator from "validator";

class EnterEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: "",
            proceed: false,
        };
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });

        if (!validator.isEmail(this.state.email)) {
            this.setState({
                emailError: "Enter valid email!",
                proceed: false,
            });
        } else {
            this.setState({
                emailError: "",
                proceed: true,
            });
        }
    };

    nextHandler = (event) => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="auth-form">
                <form class>
                    <div className="label">
                        <label for="email">Email Address</label>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="e.g. jane.doe@email.com"
                        onChange={this.changeHandler}
                    />
                    <span className="input-error">{this.state.emailError}</span>
                </form>
                <div className="button-row">
                    <button
                        className="primary-button"
                        type="button"
                        name="next"
                        disabled={!this.state.proceed}
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
