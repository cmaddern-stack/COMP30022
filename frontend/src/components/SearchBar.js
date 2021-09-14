import React from "react";
import "./SearchBar.css";
import { FontAwesome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
        };
    }

    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onClick = async(event) => {
        // TODO: On click on search callback from props
        // E.g. this.props.callback()
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    name="searchField"
                    placeholder="Search"
                    onChange={this.handleChange}
                />
                <div className="search-button" onClick={this.onClick}>
                    <FaSearch />
                </div>
            </div>
        );
    }
}

export default SearchBar;
