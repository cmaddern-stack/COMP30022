import "../css/EditContact.css";
import ContactsAPI from "../apis/contactsApi";
import { GroupsAPI } from "../apis/groupsApi";
import ContactOverlay from "./ContactOverlay";

export default class EditContact extends ContactOverlay {
    componentDidMount = async () => {
        await super.componentDidMount();
        // const contact = await ContactsAPI.getContact(this.props.location.url);
        const endpoint = "https://team-69-backend.herokuapp.com/crm/contacts/";
        const url = endpoint + this.props.match.params.id + "/";
        const contact = await ContactsAPI.getContact(url);
        const group = await GroupsAPI.getContactGroup(url);
        const groups = await GroupsAPI.getGroupNames();
        const answers = await ContactsAPI.customAnswers(url);
        var customInput = this.state.customInput;
        for (var i = 0; i < answers.length; i++) {
            if (customInput[i].url === answers[i].question) {
                customInput[i].value = answers[i].data;
                customInput[i].answerurl = answers[i].url;
            }
        }

        this.setState({
            url: url,
            starred: contact.starred,
            loading: false,
            photoURL: contact.image === null ? "" : contact.image,
            firstName: this.valOrEmptyString(contact.firstName),
            lastName: this.valOrEmptyString(contact.lastName),
            email: this.valOrEmptyString(contact.emailAddress),
            organisation: this.valOrEmptyString(contact.organisation),
            role: this.valOrEmptyString(contact.role),
            phone: this.valOrEmptyString(contact.phoneNumber),
            originalGroup: group,
            group: group,
            groups: groups,
            customInput: customInput,
        });
    };

    valOrEmptyString = (val) => {
        return val ? val : "";
    };

    save = async () => {
        await super.save();
        await ContactsAPI.editContact(this.state.url, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            organisation: this.state.organisation,
            role: this.state.role,
            phone: this.state.phone,
        });
        await GroupsAPI.updateContactGroup(
            this.state.url,
            this.state.originalGroup && this.state.originalGroup.url,
            this.state.group && this.state.group.url,
            this.state.group && this.state.group.label
        );
        const customInput = await ContactsAPI.saveCustomQuestions(
            this.state.customInput
        );
        this.setState({
            customInput: customInput,
        });
        await ContactsAPI.saveCustomAnswers(
            this.state.url,
            this.state.customInput
        );
        await ContactsAPI.deleteCustomQuestions(this.state.deletedInput);

        await ContactsAPI.saveContactPhoto(this.state.url, this.state.image);
        this.goBackAndReload();
    };

    deleteContact = async () => {
        this.goBackAndReload();
        await ContactsAPI.deleteContact(this.state.url);
    };
}
