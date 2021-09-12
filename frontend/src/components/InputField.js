import React from "react";

class InputField extends React.Component {
    onChange = (event) => {
        this.props.onChange(event);
    };

    render() {
        return (
            <div className="input-field">
                <div className="label">
                    <label for={this.props.name}>{this.props.label}</label>
                </div>
                <input
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                />
                <div className="input-error">{this.props.error}</div>
            </div>
        );
    }
}

export default InputField;
