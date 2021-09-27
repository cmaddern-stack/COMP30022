const BASE_URL = "http://127.0.0.1:8000/crm/";

async function getUserProfile() {
    const id = sessionStorage.getItem('userId');
    const endpoint = BASE_URL + "useraccounts/" + id + "/";
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors"
    };
    let response = await fetch(endpoint, requestOptions);
    return response.json();
}

module.exports = {
    getUserProfile
}