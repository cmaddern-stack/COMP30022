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
                <form>
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
            </div>
        );
    }
}

export default EnterEmail;
