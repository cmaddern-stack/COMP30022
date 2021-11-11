import React from "react";
import { Route } from "react-router";
import Collapsible from "react-collapsible";
import "../css/Groups.css";
import "../css/Quickview.css";
import { GroupsAPI } from "../apis/groupsApi";
import ContactCard from "../components/groups/ContactCard";
import AddCard from "../components/groups/AddCard";
import EditContact from "../components/EditContact";
import Loading from "../components/Loading";
import Quickview from "../components/groups/Quickview";

export default class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            isLoaded: false,
            searchTerm: "",
            quickviewOptions: [
                { label: "Organisation", value: "organisation" },
                { label: "Role", value: "role" },
                { label: "Email Address", value: "emailAddress" },
                { label: "Phone Number", value: "phoneNumber" },
            ],
            quickview: [],
        };
    }

    setSearchTerm = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    componentDidMount = async () => {
        const groups = await GroupsAPI.getGroups();
        this.setState({
            groups: groups,
            isLoaded: true,
            quickview: [
                this.state.quickviewOptions[0],
                this.state.quickviewOptions[1],
            ],
        });
    };

    addToQuickView = (option) => {
        var quickview = this.state.quickview;
        quickview.push(option);
        this.setState({
            quickview: quickview,
        });
    };

    removeFromQuickView = (option) => {
        var quickview = this.state.quickview;
        quickview.splice(quickview.indexOf(option), 1);
        this.setState({
            quickview: quickview,
        });
        console.log(this.state.quickview);
    };

    contactInQuery = (contact) => {
        if (this.state.searchTerm === "") return contact;
        else if (
            (contact.firstName &&
                contact.firstName
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())) ||
            (contact.lastName &&
                contact.lastName
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())) ||
            (this.state.quickview.includes(this.state.quickviewOptions[0]) &&
                contact.organisation &&
                contact.organisation
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())) ||
            (this.state.quickview.includes(this.state.quickviewOptions[1]) &&
                contact.role &&
                contact.role
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())) ||
            (this.state.quickview.includes(this.state.quickviewOptions[2]) &&
                contact.emailAddress &&
                contact.emailAddress
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())) ||
            (this.state.quickview.includes(this.state.quickviewOptions[3]) &&
                contact.phoneNumber &&
                contact.phoneNumber
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase()))
        )
            return contact;
    };

    render() {
        if (!this.state.isLoaded) {
            return <Loading />;
        }
        return (
            <div>
                <Route
                    exact
                    path={`/groups/edit/:id`}
                    component={EditContact}
                ></Route>
                <div className="groups-area">
                    <div className="group-options-row">
                        <input
                            type="text"
                            name="searchTerm"
                            placeholder="Search..."
                            onChange={this.setSearchTerm}
                        />
                        <Quickview
                            quickview={this.state.quickview}
                            quickviewOptions={this.state.quickviewOptions}
                            addCallback={this.addToQuickView}
                            removeCallback={this.removeFromQuickView}
                        />
                    </div>
                    {this.state.groups.length > 0 &&
                        this.state.groups.map((group, groupKey) => (
                            <div className="group-area" key={groupKey}>
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
                                                return this.contactInQuery(
                                                    contact
                                                );
                                            })
                                            .map((contact, key) => {
                                                return (
                                                    <div
                                                        className="user"
                                                        key={key}
                                                    >
                                                        <ContactCard
                                                            contact={contact}
                                                            group={group.name}
                                                            quickview={
                                                                this.state
                                                                    .quickview
                                                            }
                                                        />
                                                    </div>
                                                );
                                            })}
                                        <AddCard group={group} />
                                    </div>
                                </Collapsible>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}
