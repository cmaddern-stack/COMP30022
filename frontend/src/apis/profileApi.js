const BASE_URL = "http://127.0.0.1:8000/crm/";
const id = sessionStorage.getItem("userId");
const accountEndpoint = BASE_URL + "useraccounts/" + id + "/";
const profileEndpoint = BASE_URL + "userprofiles/" + id + "/";

async function getUserProfile() {
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
    };
    let accountResponse = await fetch(accountEndpoint, requestOptions);
    let profileResponse = await fetch(profileEndpoint, requestOptions);
    var accountData = await accountResponse.json();
    let profileData = await profileResponse.json();
    accountData.organisation = profileData.organisation;
    accountData.role = profileData.role;
    accountData.phone = profileData.phoneNumber;
    return accountData;
}

async function updateProfile(user) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            id: id,
            url: profileEndpoint,
            userAccount: accountEndpoint,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            organisation: user.organisation,
            role: user.role,
            phoneNumber: user.phone,
        }),
    };
    await fetch(accountEndpoint, requestOptions);
    await fetch(profileEndpoint, requestOptions);
    return { success: true };
}

async function getCustomFields() {
    const endpoint = profileEndpoint + "fields/";
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
    };
    const fields = await fetch(endpoint, requestOptions);
    return fields.json();
}

async function updateCustomFields(fields) {
    const endpoint = profileEndpoint + "fields/";
    for (var field of fields) {
        field.userAccount = id;
    }
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            fields: fields,
        }),
    };
    await fetch(endpoint, requestOptions);
}

module.exports = {
    getUserProfile,
    updateProfile,
    getCustomFields,
    updateCustomFields,
};
