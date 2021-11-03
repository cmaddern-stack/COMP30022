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
        this.updateQuickView();
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.updateQuickView();
        }
    }

    updateQuickView = () => {
        const quickview = this.props.quickview;
        const values = quickview.map((quickview) => quickview.value);
        var entries = [];
        for (const [label, value] of Object.entries(this.props.contact)) {
            if (values.includes(label)) {
                var i = values.indexOf(label);
                entries.push({ label: quickview[i].label, value: value });
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
        this.props.history.push({
            pathname: `${this.props.match.url.replace(/\/$/g, "")}/edit/${
                this.props.contact.id
            }`,
            group: this.props.group,
        });
    };

    render() {
        return (
            <div
                className="rcorners group-contact-card"
                onClick={this.editContact}
            >
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
                        <tbody>
                        {this.state.entries.map((entry, key) => {
                            return (
                                <tr key={key}>
                                    <th>{entry.label}</th>
                                    <td>{entry.value}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ContactCard);
