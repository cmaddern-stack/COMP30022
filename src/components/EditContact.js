import React from "react";
import Modal from "./Modal";
import "../css/EditContact.css";
import ContactsAPI from "../apis/contactsApi";
import InputField from "./InputField";
import CustomInputField from "./CustomInputField";
import ProfilePhoto from "./ProfilePhoto";
import ContactCardStar from "./groups/ContactCardStar";

export default class EditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            loading: true,
            starred: false,
            photoURL: "",
            firstName: "",
            lastName: "",
            email: "",
            organisation: "",
            role: "",
            phone: "",
            emailError: "",
            emailValid: true,
            customInput: [],
        };
    }

    async componentDidMount() {
        // const contact = await ContactsAPI.getContact(this.props.location.url);
        const endpoint = "https://team-69-backend.herokuapp.com/crm/contacts/";
        const url = endpoint + this.props.match.params.id + "/";
        const contact = await ContactsAPI.getContact(url);
        this.setState({
            url: url,
            starred: contact.starred,
            loading: false,
            photoURL: "",
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.emailAddress,
            organisation: contact.organisation,
            role: contact.role,
            phone: contact.phoneNumber,
        });
        // TODO: ADD CUSTOM FIELDS
    }

    proceed = () => {
        return true;
    };

    changeHandler = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    customChangeHandler = async (event) => {
        const newCustomInput = this.state.customInput;
        const id = parseInt(event.target.name);
        newCustomInput[id] = {
            label: this.state.customInput[id].label,
            value: event.target.value,
        };
        this.setState({
            customInput: newCustomInput,
            buttonDisabled: false,
        });
    };

    customLabelChangeHandler = async (event) => {
        const newCustomInput = this.state.customInput;
        const id = parseInt(event.target.name);
        newCustomInput[id] = {
            label: event.target.value,
            value: this.state.customInput[id].value,
        };
        // labels must not be blank
        this.setState({
            customInput: newCustomInput,
            buttonDisabled: false,
        });
    };

    getCustomFields = () => {
        var fields = [];
        for (const [id, item] of this.state.customInput.entries()) {
            fields.push(
                <CustomInputField
                    key={id}
                    listId={id}
                    label={item.label}
                    type="text"
                    placeholder="Enter field value"
                    value={item.value}
                    name={id}
                    onChange={this.customChangeHandler}
                    onLabelChange={this.customLabelChangeHandler}
                    onDeleteChange={this.deleteCustomField}
                />
            );
        }
        return fields;
    };

    addCustomField = () => {
        var newCustomInputs = this.state.customInput;
        newCustomInputs.push({
            label: "Label",
            value: "",
        });
        this.setState({
            customInput: newCustomInputs,
        });
    };

    deleteCustomField = (id) => {
        var newCustomInputs = this.state.customInput;
        newCustomInputs.splice(id, 1);
        this.setState({
            customInput: newCustomInputs,
        });
    };

    save = async () => {
        await ContactsAPI.editContact(this.state.url, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            organisation: this.state.organisation,
            role: this.state.role,
            phone: this.state.phone
        });
        // go back and reload
        var url = this.props.match.url;
        url = url.substring(0, url.lastIndexOf("/"))
        url = url.substring(0, url.lastIndexOf("/"));
        this.props.history.push(url);
        window.location.reload();
    };

    render() {
        if (this.state.contact === null) {
            return (
                <Modal
                    onClick={() => {
                        this.props.history.goBack();
                    }}
                >
                    Loading...
                </Modal>
            );
        }
        return (
            <Modal>
                <div className="edit-contact-modal" onClick={() => {}}>
                    <div className="edit-contact-card">
                        <div className="form-area">
                            <div className="edit-contact-row">
                                <ContactCardStar
                                    starred={this.state.starred}
                                    url={this.state.url}
                                    size={30}
                                />
                            </div>

                            <ProfilePhoto
                                src={this.state.photoURL}
                                alt="contact profile photo"
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                            />
                            <InputField
                                type="text"
                                name="firstName"
                                label="First Name"
                                placeholder="e.g. Jane"
                                onChange={this.changeHandler}
                                value={this.state.firstName}
                            />
                            <InputField
                                type="text"
                                name="lastName"
                                label="Last Name"
                                placeholder="e.g. Doe"
                                onChange={this.changeHandler}
                                value={this.state.lastName}
                            />
                            <InputField
                                type="email"
                                name="email"
                                label="Email Address"
                                placeholder="e.g. jane.doe@email.com"
                                onChange={this.changeHandler}
                                value={this.state.email}
                            />
                            <InputField
                                type="text"
                                name="organisation"
                                label="Organisation"
                                placeholder="e.g. Hogwarts"
                                onChange={this.changeHandler}
                                value={this.state.organisation}
                            />
                            <InputField
                                type="text"
                                name="role"
                                label="Role"
                                placeholder="e.g. Wizard"
                                onChange={this.changeHandler}
                                value={this.state.role}
                            />
                            <InputField
                                type="text"
                                name="phone"
                                label="Phone Number"
                                placeholder="e.g. +61 302 203 392"
                                onChange={this.changeHandler}
                                value={this.state.phone}
                            />
                            {this.getCustomFields()}
                            <div
                                className="new-field-button"
                                onClick={this.addCustomField}
                            >
                                + New Field
                            </div>
                        </div>
                        <div className="button-row">
                            <button
                                className="secondary-button button"
                                type="button"
                                name="cancel"
                                onClick={() => {
                                    this.props.history.goBack();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="primary-button button"
                                type="button"
                                name="save"
                                disabled={!this.proceed()}
                                onClick={this.save}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
