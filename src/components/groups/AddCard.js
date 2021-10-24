import React from "react";
import CustomizedDialogs from "../Dialog";

export default class AddCard extends React.Component {
    render() {
        return (
            <div className="add-contact-card">
                <div className="center iris60">
                    <CustomizedDialogs />
                </div>
            </div>
        );
    }
}
