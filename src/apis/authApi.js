const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

class AuthAPI {
    static checkEmail = async (email) => {
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
    };

    static signup = async (user) => {
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
    };

    static login = async (user) => {
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
    };
}

export default AuthAPI;
