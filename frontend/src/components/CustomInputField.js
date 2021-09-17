import React from "react";
import "./InputField.css";
import { FaMinusCircle, FontAwesome } from "react-icons/fa";

/**
 * Custom Input Field
 * Input field with a customisable label with props:
 * - onChange: callback function for when input field value is changed
 * - onLabelChange: callback function for when input field label is changed
 * - onDeleteChange: callback function for when delete button is clicked 
 * - name: input label name (usually index)
 * - label: current label 
 * - value: current value
 * - placeholder: value placeholder
 */
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
                    type="text"
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
