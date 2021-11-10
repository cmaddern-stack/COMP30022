import React from "react";
import Modal from "./Modal";
import "../css/EditContact.css";
import InputField from "./InputField";
import CustomInputField from "./CustomInputField";
import ProfilePhoto from "./ProfilePhoto";
import ContactCardStar from "./groups/ContactCardStar";
import Loading from "./Loading";
import AuthController from "../controllers/AuthController";
import { Close } from "@material-ui/icons";
import CreatableSelect from "react-select/creatable";
import "../css/ReactSelect.css";
import ContactsAPI from "../apis/contactsApi";

const style = {
    control: (base) => ({
        ...base,
        border: 0,
        boxShadow: "none",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
    }),
};

export default class ContactOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            loading: true,
            starred: false,
            changes: false,
            photoURL: "",
            image: null,
            firstName: "",
            lastName: "",
            email: "",
            organisation: "",
            role: "",
            phone: "",
            phoneError: "",
            phoneValid: true,
            emailError: "",
            emailValid: true,
            customInput: [],
            originalGroup: null,
            group: null,
            groups: [],
        };
    }

    async componentDidMount() {
        var customInput = [];
        const questions = await ContactsAPI.customQuestions();
        for (var i = 0; i < questions.length; i++) {
            customInput.push({
                label: questions[i].question,
                value: "",
                url: questions[i].url,
            });
        }
        this.setState({
            customInput: customInput,
        });
    }

    proceed = () => {
        return (
            this.state.changes && this.state.emailValid && this.state.phoneValid
        );
    };

    changeHandler = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            changes: true,
        });
    };

    emailChangeHandler = async (event) => {
        await this.changeHandler(event);
        const emailValidation = await AuthController.emailChangeHandler(
            this.state.email,
            true // isEmptyValid
        );
        this.setState({
            emailError: emailValidation.error,
            emailValid: emailValidation.valid,
        });
    };

    phoneChangeHandler = async (event) => {
        await this.changeHandler(event);
        const validation = await AuthController.phoneChangeHandler(
            this.state.phone,
            true // isEmptyValid
        );
        this.setState({
            phoneError: validation.error,
            phoneValid: validation.valid,
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
            changes: true,
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
            changes: true,
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
            changes: true,
        });
    };

    deleteCustomField = (id) => {
        var newCustomInputs = this.state.customInput;
        newCustomInputs.splice(id, 1);
        this.setState({
            customInput: newCustomInputs,
            changes: true,
        });
    };

    deleteContact = async () => {};

    async save() {}

    goBackAndReload = () => {
        var url = this.props.match.url;
        url = url.substring(0, url.lastIndexOf("/"));
        url = url.substring(0, url.lastIndexOf("/"));
        this.props.history.push(url);
        window.location.reload();
    };

    defaultGroup = () => {
        if (this.state.group) {
            return this.state.groups.filter((group) => {
                return group.label === this.state.group.name;
            })[0];
        }
    };

    onGroupSelect = (newValue, actionMeta) => {
        switch (actionMeta.action) {
            case "select-option": {
                this.setState({
                    group: newValue,
                });
                break;
            }
            case "clear": {
                this.setState({
                    group: "",
                });
                break;
            }
            case "create-option": {
                var groups = this.state.groups;
                groups.push(newValue);
                this.setState({
                    group: newValue,
                    groups: groups,
                });
                break;
            }
        }
        this.setState({
            changes: true,
        });
    };

    groupInputChangeHandler = (inputValue, actionMeta) => {};

    photoChangeHandler = async (event) => {
        // creates temporary URL for selected photo file object
        const selected = URL.createObjectURL(event.target.files[0]);
        this.setState({
            photoURL: selected,
            image: event.target.files[0],
            changes: true,
        });
    };

    closeDialog = () => {
        this.props.history.goBack();
    };

    render() {
        if (this.state.loading) {
            return (
                <Modal onClick={this.closeDialog}>
                    <Loading />
                </Modal>
            );
        }
        return (
            <Modal
                onClick={this.closeDialog}
                children={[
                    <div className="edit-contact-modal">
                        <div
                            className="edit-contact-card"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="close-button">
                                <Close onClick={this.closeDialog} />
                            </div>
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
                                    onChange={this.photoChangeHandler}
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
                                <label for="group">Group</label>
                                <CreatableSelect
                                    isClearable
                                    onChange={this.onGroupSelect}
                                    onInputChange={this.groupInputChangeHandler}
                                    options={this.state.groups}
                                    defaultValue={this.defaultGroup()}
                                    styles={style}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "#F8F9FC",
                                            primary: "#a5a6f6",
                                        },
                                    })}
                                />
                                <InputField
                                    type="email"
                                    value={this.state.email}
                                    name="email"
                                    label="Email Address"
                                    placeholder="e.g. jane.doe@email.com"
                                    onChange={this.emailChangeHandler}
                                    error={this.state.emailError}
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
                                    placeholder="e.g. 0402203392"
                                    onChange={this.phoneChangeHandler}
                                    value={this.state.phone}
                                    error={this.state.phoneError}
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
                                    className="accent-button button"
                                    type="button"
                                    name="delete"
                                    onClick={this.deleteContact}
                                >
                                    Delete
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
                    </div>,
                ]}
            ></Modal>
        );
    }
}
