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

    static createGroup = async (groupName, contacts) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                name: groupName,
                contacts: contacts,
            }),
        };
        const response = await fetch(BASE_URL + "groups/", requestOptions);
        var groups = await response.json();
    };

    static deleteGroup = async (url) => {
        const requestOptions = {
            method: "DELETE",
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

    static deleteEmptyGroups = async () => {
        const groups = await GroupsAPI.getGroups();
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].contacts.length === 0) {
                GroupsAPI.deleteGroup(groups[i].url);
            }
        }
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

    static updateContactGroup = async (
        contactURL,
        oldURL,
        newURL,
        newGroupName
    ) => {
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

        // no group changes
        if (oldURL === newURL) return;

        // no group to remove contact from if !oldURL
        // remove contact from existing group
        if (oldURL) {
            const oldGroup = await GroupsAPI.getGroup(oldURL);
            var oldContacts = oldGroup.contacts;
            oldContacts.splice(oldContacts.indexOf(contactURL), 1);
            await fetch(oldURL, requestOptions(oldContacts));

            // delete empty groups
            if (oldContacts.length === 0) {
                GroupsAPI.deleteGroup(oldURL);
            }
        }

        // new group created
        if (newGroupName && !newURL) {
            await GroupsAPI.createGroup(newGroupName, [contactURL]);
        }
        // add contact to existing group
        else {
            const newGroup = await GroupsAPI.getGroup(newURL);
            var newContacts = newGroup.contacts;
            newContacts.push(contactURL);
            await fetch(newURL, requestOptions(newContacts));
        }
        // otherwise contact becomes ungrouped
    };
}
