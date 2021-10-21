import React from "react";
import Modal from "./Modal";
import "../css/EditContact.css";
import ContactsAPI from "../apis/contactsApi";
import InputField from "./InputField";
import CustomInputField from "./CustomInputField";
import ProfilePhoto from "./ProfilePhoto";
import ContactCardStar from "./groups/ContactCardStar";
import { GroupsAPI } from "../apis/groupsApi";
import ContactOverlay from "./ContactOverlay";

export default class EditContact extends ContactOverlay {
    componentDidMount = async () => {
        // const contact = await ContactsAPI.getContact(this.props.location.url);
        const endpoint = "https://team-69-backend.herokuapp.com/crm/contacts/";
        const url = endpoint + this.props.match.params.id + "/";
        const contact = await ContactsAPI.getContact(url);
        const groups = await GroupsAPI.getGroupNames();
        this.setState({
            url: url,
            starred: contact.starred,
            loading: false,
            photoURL: "",
            firstName: this.valOrEmptyString(contact.firstName),
            lastName: this.valOrEmptyString(contact.lastName),
            email: this.valOrEmptyString(contact.emailAddress),
            organisation: this.valOrEmptyString(contact.organisation),
            role: this.valOrEmptyString(contact.role),
            phone: this.valOrEmptyString(contact.phoneNumber),
            group: this.valOrEmptyString(this.props.location.group),
            groups: groups,
        });
        // TODO: ADD CUSTOM FIELDS
    };

    valOrEmptyString = (val) => {
        return val ? val : "";
    };

    save = async () => {
        await ContactsAPI.editContact(this.state.url, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            organisation: this.state.organisation,
            role: this.state.role,
            phone: this.state.phone,
        });
        this.goBackAndReload();
    };

    deleteContact = async () => {
        this.goBackAndReload();
        await ContactsAPI.deleteContact(this.state.url);
    };
}
