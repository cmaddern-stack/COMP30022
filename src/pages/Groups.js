import React, { useEffect } from "react";
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
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search..."
                    onChange={this.setSearchTerm}
                />
                {this.state.groups.map((group) => (
                    <div>
                        <div className="padded title">{group.name}</div>
                        <Collapsible
                            triggerClassName="padded"
                            trigger="Expand"
                            triggerOpenedClassName="padded"
                            triggerWhenOpen="Collapse"
                            open={true}
                        >
                            <div className="topContainer">
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
        );
    }
}
