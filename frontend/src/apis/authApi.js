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

async function signup(user) {
    const endpoint = BASE_URL + "useraccounts/";
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            username: user.email,
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
        }),
    };
    let response = await fetch(endpoint, requestOptions);
    return response.json();
}

async function login(user) {
    const endpoint = BASE_URL + "api-auth/alt-login/";
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            username: user.email,
            password: user.password,
        }),
    };
    let response = await fetch(endpoint, requestOptions);
    return response.json();
}

module.exports = {
    checkEmail,
    signup,
    login,
};
