import React from "react";
import { Star, StarOutline } from "@material-ui/icons";
import "../../css/Groups.css";
import ContactsAPI from "../../apis/contactsApi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

export default class ContactCardStar extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleStar = async (event) => {
        event.stopPropagation();
        await ContactsAPI.toggleStar(this.props.url, !this.props.starred);
        window.location.reload();
    };

    render() {
        var ICON_SIZE = "16px";
        if (this.props.size !== null) {
            ICON_SIZE = this.props.size;
        }
        return (
            <div onClick={this.toggleStar} data-testid="contact-card-star">
                {this.props.starred ? (
                    <div className="contact-star starred">
                        <IconContext.Provider
                            value={{ color: "#df5571", size: ICON_SIZE }}
                        >
                            <AiFillStar />
                        </IconContext.Provider>
                    </div>
                ) : (
                    <div className="contact-star unstarred">
                        <IconContext.Provider
                            value={{ color: "a4a6f6", size: ICON_SIZE }}
                        >
                            <AiOutlineStar />
                        </IconContext.Provider>
                    </div>
                )}
            </div>
        );
    }
}
