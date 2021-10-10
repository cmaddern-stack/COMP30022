import React from "react";
import Collapsible from "react-collapsible";
import "../css/Groups.css";
import { GroupsAPI } from "../apis/groupsApi";
import ContactCard from "../components/groups/ContactCard";
import AddCard from "../components/groups/AddCard";

export default class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            isLoaded: false,
            searchTerm: "",
        };
    }

    setSearchTerm = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    componentDidMount = async () => {
        const groups = await GroupsAPI.getGroups();
        console.log(groups);
        this.setState({
            groups: groups,
            isLoaded: true,
        });
    };

    render() {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <div className="groups-area">
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search..."
                        onChange={this.setSearchTerm}
                    />
                    {this.state.groups.map((group) => (
                        <div className="group-area">
                            <div className="title">{group.name}</div>
                            <Collapsible
                                triggerClassName="trigger-text"
                                trigger="Expand"
                                triggerOpenedClassName="trigger-text"
                                triggerWhenOpen="Collapse"
                                open={true}
                            >
                                <div className="contact-card-area">
                                    {group.contactObjects
                                        .filter((contact) => {
                                            if (this.state.searchTerm === "")
                                                return contact;
                                            else if (
                                                contact.firstName
                                                    .toLowerCase()
                                                    .includes(
                                                        this.state.searchTerm.toLowerCase()
                                                    )
                                            )
                                                return contact;
                                        })
                                        .map((contact, key) => {
                                            return (
                                                <div className="user" key={key}>
                                                    <ContactCard
                                                        contact={contact}
                                                    />
                                                </div>
                                            );
                                        })}
                                    <AddCard />
                                </div>
                            </Collapsible>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
