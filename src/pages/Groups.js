import React from "react";
import { Route } from "react-router";
import Collapsible from "react-collapsible";
import "../css/Groups.css";
import { GroupsAPI } from "../apis/groupsApi";
import ContactCard from "../components/groups/ContactCard";
import AddCard from "../components/groups/AddCard";
import EditContact from "../components/EditContact";
import Loading from "../components/Loading";

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
            return <Loading/>
        }
        return (
            <div>
                <Route
                    exact
                    path={`/groups/edit/:id`}
                    component={EditContact}
                ></Route>
                <div className="groups-area">
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search..."
                        onChange={this.setSearchTerm}
                    />
                    {(this.state.groups.length > 0) && this.state.groups.map((group) => (
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
