import ContactsAPI from "./contactsApi";

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";
// const BASE_URL = "http://127.0.0.1:8000/crm/";


export class GroupsAPI {
    static getGroups = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    `token ${sessionStorage.getItem("token")}`
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
