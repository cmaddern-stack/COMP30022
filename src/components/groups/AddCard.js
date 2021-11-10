import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

class AddCard extends React.Component {
    handleClickOpen = () => {
        this.props.history.push({
            pathname: `${this.props.match.url.replace(/\/$/g, "")}/add/`,
            group: this.props.group
        });
    };

    render() {
        return (
            <div className="add-contact-card">
                <div className="center iris60">
                    <div className="group-add-contact-button">
                        <Button color="primary" onClick={this.handleClickOpen}>
                            + Add Contact
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddCard);
