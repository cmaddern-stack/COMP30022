const BASE_URL = "http://127.0.0.1:8000/crm/";

async function checkEmail(email) {
    const endpoint = BASE_URL + "api-auth/checkemail/";
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ email: email }),
    };
    let response = await fetch(endpoint, requestOptions);
    return response.json();
}

function signup(user) {
    const endpoint = BASE_URL + "useraccounts/";
}

module.exports = {
    checkEmail,
    signup,
};
