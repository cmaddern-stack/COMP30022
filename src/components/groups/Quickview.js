import React from "react";
import "../../css/Quickview.css";
import {
    CheckBoxOutlineBlankRounded,
    CheckBoxRounded,
} from "@material-ui/icons";

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
                <CheckBoxRounded style={{ fontSize: 16 }} />
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
                <CheckBoxOutlineBlankRounded style={{ fontSize: 16 }} />
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
