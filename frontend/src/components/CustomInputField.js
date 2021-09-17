import React from "react";
import "./InputField.css";
import { FaMinusCircle, FontAwesome } from "react-icons/fa";

class CustomInputField extends React.Component {
    onChange = (event) => {
        this.props.onChange(event);
    };

    onLabelChange = (event) => {
        this.props.onLabelChange(event);
    };

    onDeleteChange = () => {
        this.props.onDeleteChange(this.props.name);
    };

    render() {
        return (
            <div className="input-field custom-input-field">
                <div className="label">
                    <label for={this.props.name}>
                        <input
                            type="text"
                            className="custom-input-label"
                            name={this.props.name}
                            value={this.props.label}
                            onChange={this.onLabelChange}
                        />
                    </label>
                    <FaMinusCircle
                        className="delete-button"
                        id={this.props.name}
                        onClick={this.onDeleteChange}
                    />
                </div>
                <input
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    value={this.props.value}
                />
                <div className="input-error">{this.props.error}</div>
            </div>
        );
    }
}

export default CustomInputField;
