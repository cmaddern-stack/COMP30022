import React from "react";
import "../css/SearchBar.css";
import { FontAwesome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
    }

    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onClick = async (event) => {
        // TODO: connect searching
    };

    render() {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    name="searchTerm"
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
