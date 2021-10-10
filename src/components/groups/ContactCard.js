import React from "react";
import ContactCardStar from "./ContactCardStar";
import { withRouter } from "react-router-dom";

class ContactCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
        };
    }

    componentDidMount() {
        // TODO: Get QuickView fields from user settings
        const quickview = ["organisation", "role"];
        var entries = [];
        for (const [label, value] of Object.entries(this.props.contact)) {
            if (quickview.includes(label)) {
                entries.push({ label: label, value: value });
            }
        }
        this.setState({
            entries: entries,
        });
    }

    getProfileIcon = () => {
        // TODO: Incorporate contact profile picture
        return (
            (this.props.contact.firstName && this.props.contact.firstName[0]) +
            (this.props.contact.lastName && this.props.contact.lastName[0])
        );
    };

    editContact = async () => {
        this.props.history.push(`${this.props.match.url}/edit/${this.props.contact.id}`);
    }

    render() {
        return (
            <div className="rcorners group-contact-card" onDoubleClick={this.editContact}>
                <div className="contact-card-title">
                    <div className="left-col">
                        <div className="dot">
                            <div className="centeredInDot">
                                {this.getProfileIcon()}
                            </div>
                        </div>
                        <div>
                            {this.props.contact.firstName}{" "}
                            {this.props.contact.lastName}
                        </div>
                    </div>
                    <div className="right-col">
                        <ContactCardStar
                        starred={this.props.contact.starred}
                        url={this.props.contact.url}
                    />
                    </div>
                </div>
                <div className="">
                    <table className="contact-details">
                        {this.state.entries.map((entry) => {
                            return (
                                <tr>
                                    <th>{entry.label}</th>
                                    <td>{entry.value}</td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ContactCard);