const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

export class GroupsAPI {
    static getGroups = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Need to change this to token authorization
                Authorization:
                    `Basic ` +
                    btoa(
                        sessionStorage.getItem("username") +
                            ":" +
                            "Today123"
                    ),
            },
            mode: "cors",
        };
        const response = await fetch(BASE_URL + "groups/", requestOptions);
        var groups = await response.json();
        for (let i=0; i<groups.length; i++) {
            const group = groups[i];
            group.contactObjects = [];
            for (let j = 0; j < group.contacts.length; j++) {
                const res = await GroupsAPI.getContact(group.contacts[j]);
                group.contactObjects.push(res);
            }
        }
        return groups;
    };

    static getContact = async (url) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Need to change this to token authorization
                Authorization:
                    `Basic ` +
                    btoa(sessionStorage.getItem("username") + ":" + "Today123"),
            },
            mode: "cors",
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    }
}

// export function useGroups() {
//     const [loading, setLoading] = useState(true);
//     const [items, setItems] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         getGroups()
//             .then((items) => {
//                 setItems(items);
//                 setLoading(false);
//             })
//             .catch((e) => {
//                 setError(e);
//                 setLoading(false);
//             });
//     }, []);

//     return {
//         loading,
//         items,
//         error,
//     };
// }
