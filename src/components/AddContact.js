import "../css/EditContact.css";
import ContactsAPI from "../apis/contactsApi";
import { GroupsAPI } from "../apis/groupsApi";
import ContactOverlay from "./ContactOverlay";

export default class AddContact extends ContactOverlay {
    componentDidMount = async () => {
        await super.componentDidMount();
        const group = this.props.location.group ? this.props.location.group : null;
        this.setState({
            loading: false,
            group: group,
            originalGroup: group,
        });
    };

    save = async () => {
        await super.save();
        // create new contact
        const contact = await ContactsAPI.createContact({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            organisation: this.state.organisation,
            role: this.state.role,
            phone: this.state.phone,
        });

        this.setState({
            url: contact.url
        })

        // create new contact group
        await GroupsAPI.updateContactGroup(
            this.state.url,
            this.state.originalGroup && this.state.originalGroup.url,
            this.state.group && this.state.group.url,
            this.state.group && this.state.group.label
        );

        // save contact photo
        await ContactsAPI.saveContactPhoto(this.state.url, this.state.image);

        // save contact custom answers and questions
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

        this.goBackAndReload();
    };

    deleteContact = () => {
        this.props.history.goBack();
    };
}
