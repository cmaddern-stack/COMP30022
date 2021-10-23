import React from "react";
import "../css/InputField.css";

/**
 * Input Field
 * props:
 * - name
 * - label
 * - type
 * - placeholder
 * - onChange
 * - value
 * - error
 */
class InputField extends React.Component {
    onChange = (event) => {
        this.props.onChange(event);
    };

    render() {
        return (
            <div className="input-field">
                <div>
                    <label
                        className="label"
                        id={this.props.name}
                        htmlFor={this.props.name}
                    >
                        {this.props.label}
                    </label>
                    <input
                        id={this.props.name}
                        type={this.props.type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this.onChange}
                        value={this.props.value}
                        data-testid={this.props.name}
                    />
                </div>

                <div className="input-error" data-testid="input-error">
                    {this.props.error}
                </div>
            </div>
        );
    }
}

export default InputField;
