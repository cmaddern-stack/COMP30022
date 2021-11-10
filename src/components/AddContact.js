import React from "react";
import Modal from "./Modal";
import "../css/EditContact.css";
import ContactsAPI from "../apis/contactsApi";
import InputField from "./InputField";
import CustomInputField from "./CustomInputField";
import ProfilePhoto from "./ProfilePhoto";
import ContactCardStar from "./groups/ContactCardStar";
import { GroupsAPI } from "../apis/groupsApi";
import ProfileAPI from "../apis/profileApi";

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";
// const BASE_URL = "http://127.0.0.1:8000/crm/";


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

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
            group: "",
            role: "",
            phone: "",
            emailError: "",
            emailValid: true,
            customInput: [],
        };
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

        var contactUrl = "";
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    `Basic ` +
                    btoa(
                        sessionStorage.getItem("username") +
                            ":" +
                            sessionStorage.getItem("password")
                    ),
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                organisation: this.state.organisation,
                role: this.state.role,
                phone: this.state.phone
            }),
            mode: "cors",
        };
        await fetch(BASE_URL+ "contacts/", requestOptions)
        .then(res => {
           return res.json()
        })
        .then(data => {
            contactUrl = data.url
        })
        .catch(error => {
            console.log(error)
        })

        var groups = await GroupsAPI.getGroups();

        var group = "";
        var found = false;

        for (let i=0; i < groups.length; i++){
            if(JSON.stringify(groups[i].name) === JSON.stringify(this.state.group)){
                found = true;
                group = groups[i];
            }
        }

        if(!found){
                const data = await ProfileAPI.getUserProfile();

                const newGroup = JSON.stringify({
                    name: this.state.group,
                    groupOwner: BASE_URL + "userprofiles/" + data.id + "/",
                    contacts: [],
                });

                const requestOptionsGroup = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization:
                            `Basic ` +
                            btoa(
                                sessionStorage.getItem("username") +
                                    ":" +
                                    sessionStorage.getItem("password")
                            ),
                    },
                    body: newGroup,
                    mode: "cors",
                }
                await fetch(BASE_URL+ "groups/", requestOptionsGroup)
                .then(res => {
                return res.json()
                })
                .catch(error => {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error)
                })
        }
        groups = await GroupsAPI.getGroups();
        for (let i=0; i < groups.length; i++){
            if(JSON.stringify(groups[i].name) === JSON.stringify(this.state.group)){
                found = true;
                group = groups[i];
            }
        }
        
        // debugger 
        // group['contacts'].push(contactUrl);
        const requestOptionsGroup = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    `Basic ` +
                    btoa(
                        sessionStorage.getItem("username") +
                            ":" +
                            sessionStorage.getItem("password")
                    ),
            },
            body: JSON.stringify(group),
            mode: "cors",
        }
        await fetch(BASE_URL+ "groups/" + JSON.stringify(group.id) + "/", requestOptionsGroup)
        .then(res => {
        return res.json()
        })
        .then(data => {
        // enter you logic when the fetch is successful
            //console.log(data)
        //this.nextPath(data)
        
        })
        .catch(error => {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
        })

        this.props.history.goBack();

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
                                name="group"
                                label="Group"
                                placeholder="e.g. Work Colleague"
                                onChange={this.changeHandler}
                                value={this.state.group}
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
