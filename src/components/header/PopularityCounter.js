import React from "react";

/**
 * Popularity Counter
 * Icon on the header that shows the user how many people have
 * downloaded their contact information
 */
class PopularityCounter extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Retrieve popularity information to be displayed
        this.state = {
            popularity: "0",
        };
    }

    render() {
        return (
            <div className="popularity-dropdown">
                <div className="popularity">{this.state.popularity}</div>
                <div className="tool-tip">Accumulate points as others download your contact information!</div>
            </div>
        );
    }
}

export default PopularityCounter;
