const BASE_URL = "http://127.0.0.1:8000/crm/api-auth/";

function checkEmail(email) {
    const endpoint = BASE_URL + "checkemail/";
    return fetch(endpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            email: email,
        }),
    }).then((res) => res.json());
}

module.exports = {
    checkEmail
};