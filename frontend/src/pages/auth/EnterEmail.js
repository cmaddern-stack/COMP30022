import React from "react";

class EnterEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
                </form>
                <div className="button-row">
                    <button className="primary-button" type="button" name="next">
                        NEXT
                    </button>
                </div>
            </div>
        );
    }
}

export default EnterEmail;
