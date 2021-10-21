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
                Authorization: `token ${sessionStorage.getItem("token")}`,
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

    static getGroup = async (url) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static getGroupNames = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        var response = await fetch(BASE_URL + "groups/", requestOptions);
        response = await response.json();
        var groups = response.map((group) => {
            return {
                value: group.name,
                label: group.name,
                url: group.url,
            };
        });
        return groups;
    };

    static getContactGroup = async (url) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        var response = await fetch(BASE_URL + "groups/", requestOptions);
        response = await response.json();
        var group = response.filter((group) => {
            return group.contacts.includes(url);
        })[0];
        return group;
    };

    static updateContactGroup = async (contactURL, oldURL, newURL) => {
        // no group changes
        if (oldURL === newURL) return;

        // get Groups and contacts in groups
        const oldGroup = await GroupsAPI.getGroup(oldURL);
        const newGroup = await GroupsAPI.getGroup(newURL);
        var oldContacts = oldGroup.contacts;
        var newContacts = newGroup.contacts;
        // move contact to new group 
        oldContacts.splice(oldContacts.indexOf(contactURL), 1);
        newContacts.push(contactURL);

        function requestOptions(contacts) {
            return {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `token ${sessionStorage.getItem("token")}`,
                },
                mode: "cors",
                body: JSON.stringify({
                    contacts: contacts,
                }),
            };
        }
        await fetch(oldURL, requestOptions(oldContacts));
        await fetch(newURL, requestOptions(newContacts));
    };
}
