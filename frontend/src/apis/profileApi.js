const BASE_URL = "http://127.0.0.1:8000/crm/";
const id = sessionStorage.getItem("userId");
const username = sessionStorage.getItem("username");

async function getUserProfile() {
    const endpoint = BASE_URL + "useraccounts/" + id + "/";
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
    };
    let response = await fetch(endpoint, requestOptions);
    return response.json();
}

async function updateProfile(user) {
    const endpoint = BASE_URL + "useraccounts/" + id + "/";
    const requestOptions = {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email
        }),
    };
    let response = await fetch(endpoint, requestOptions);
    return {success: true, user: response.json()};
}

module.exports = {
    getUserProfile,
    updateProfile,
};
