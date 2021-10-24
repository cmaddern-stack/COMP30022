import React from "react";
import "../../css/Quickview.css";

export default class Quickview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    selectedDropdownItem = (option) => {
        return (
            <li
                id="quickview--dropdown-selected"
                onClick={() => this.props.removeCallback(option)}
            >
                {option.label}
            </li>
        );
    };

    deselectedDropdownItem = (option) => {
        return (
            <li
                id="quickview--dropdown-deselected"
                onClick={() => this.props.addCallback(option)}
            >
                {option.label}
            </li>
        );
    };

    getDropdownItem = (option) => {
        if (this.props.quickview.includes(option)) {
            return this.selectedDropdownItem(option);
        }
        return this.deselectedDropdownItem(option);
    };

    showDropdown = () => {
        if (this.state.active) {
            return (
                <div classname="quickview--dropdown" id="quickview--dropdown">
                    <ul>
                        {this.props.quickviewOptions.map((option) => {
                            return this.getDropdownItem(option);
                        })}
                    </ul>
                </div>
            );
        }
    };

    toggleDropdown = () => {
        this.setState({
            active: !this.state.active,
        });
    };

    render() {
        return (
            <div className="quickview">
                <div
                    className="quickview--button"
                    onClick={this.toggleDropdown}
                >
                    Quickview
                </div>
                {this.showDropdown()}
            </div>
        );
    }
}
