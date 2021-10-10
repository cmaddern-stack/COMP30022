import ContactsAPI from "./contactsApi";

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

export class GroupsAPI {
    static getGroups = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: Need to change this to token authorization
                Authorization:
                    `Basic ` +
                    btoa(
                        sessionStorage.getItem("username") + ":" + "#GodKing69"
                    ),
            },
            mode: "cors",
        };
        const response = await fetch(BASE_URL + "groups/", requestOptions);
        var groups = await response.json();
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            group.contactObjects = [];
            for (let j = 0; j < group.contacts.length; j++) {
                const res = await ContactsAPI.getContact(group.contacts[j]);
                group.contactObjects.push(res);
            }
        }
        return groups;
    };
}
