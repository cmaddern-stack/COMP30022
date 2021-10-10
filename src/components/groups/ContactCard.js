import React from "react";

export default class ContactCard extends React.Component {
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

    render() {
        return (
            <div className="rcorners">
                <div className="topContainer top">
                    <div className="dot">
                        <div className="centeredInDot">
                            {this.getProfileIcon()}
                        </div>
                    </div>
                    <div className="padded">
                        {this.props.contact.firstName}{" "}
                        {this.props.contact.lastName}
                    </div>
                </div>
                <div className="">
                    {this.state.entries.map((entry) => {
                        return (
                            <table>
                                <tr>
                                    <th>{entry.label}</th>
                                    <td>{entry.value}</td>
                                </tr>
                            </table>
                        );
                    })}
                </div>
            </div>
        );
    }
}
