// const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";
const BASE_URL = "http://127.0.0.1:8000/crm/";


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
        const userDetails = {
            username: user.email,
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
        };
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(userDetails),
        };
        await fetch(endpoint, requestOptions);
        let res = await AuthAPI.login(user);
        return res;
    };

    static login = async (user) => {
        const endpoint = BASE_URL + "api-auth/alt-login/";
        console.log(user);
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
