import React from "react";
import { Star, StarOutline } from "@material-ui/icons";
import "../../css/Groups.css";
import ContactsAPI from "../../apis/contactsApi";

export default class ContactCardStar extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleStar = async () => {
        await ContactsAPI.toggleStar(this.props.url, !this.props.starred);
        window.location.reload();
    };

    render() {
        var ICON_SIZE = 23;
        if (this.props.size !== null ) {
            ICON_SIZE = this.props.size
        }
        return (
            <div onClick={this.toggleStar}>
                {this.props.starred ? (
                    <div className="contact-star starred"><Star style={{ fontSize: ICON_SIZE }} /></div>
                ) : (
                    <div className="contact-star unstarred"><StarOutline style={{ fontSize: ICON_SIZE }} /></div>
                )}
            </div>
        );
    }
}
