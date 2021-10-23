import validator from "validator";
import ProfileAPI from "../apis/profileApi";
import AuthAPI from "../apis/authApi";

class AuthController {
    static emailChangeHandler = (email, isEmptyValid = false) => {
        var error, valid;
        // validate email address
        if (validator.isEmail(email)) {
            error = "";
            valid = true;
        } else {
            error = "Email invalid!";
            valid = false;
        }
        // check if empty
        if (isEmptyValid) {
            if (email === "") {
                valid = true;
                error = "";
            }
        }
        return { error: error, valid: valid };
    };

    static nameChangeHandler = async (name) => {
        var error, valid;
        if (name.length >= 2) {
            error = "";
            valid = true;
        } else {
            error = "Enter valid name!";
            valid = false;
        }
        return { error: error, valid: valid };
    };

    static passwordChangeHandler = (password) => {
        var error, valid;
        var passwordValidator = require("password-validator");
        var schema = new passwordValidator();
        schema
            .is()
            .min(8) // Minimum length 8
            .is()
            .max(100) // Maximum length 100
            .has()
            .uppercase() // Must have uppercase letters
            .has()
            .lowercase() // Must have lowercase letters
            .has()
            .digits(1) // Must have at least 1 digit
            .has()
            .not()
            .spaces(); // Should not have spaces

        if (schema.validate(password)) {
            error = "";
            valid = true;
        } else {
            error =
                "Password invalid! Valid password must contain at least 8 characters with uppercase, lowercase and digits, and must not contain any spaces.";
            valid = false;
        }
        return { error: error, valid: valid };
    };

    static confirmPasswordChangeHandler = async (password, confirmPassword) => {
        var error, valid;
        if (password === confirmPassword) {
            error = "";
            valid = true;
        } else {
            error = "Passwords do not match.";
            valid = false;
        }
        return { error: error, valid: valid };
    };

    static phoneChangeHandler = async (phone, isEmptyValid = false) => {
        var error, valid;
        if (/^-?\d+$/.test(phone)) {
            error = "";
            valid = true;
        } else {
            error = "Invalid phone number";
            valid = false;
        }
        // check if empty
        if (isEmptyValid) {
            if (phone === "") {
                valid = true;
                error = "";
            }
        }
        return { error: error, valid: valid };
    };

    // Check if email is associated with an existing account
    // If yes push to login page, otherwise push to sign up page
    static enterEmailNext = async (history, email) => {
        let data = { email: email };
        let response = await AuthAPI.checkEmail(email);
        let exists = response.success;
        var path = "";
        if (exists) {
            path = "/auth/login";
        } else {
            path = "/auth/signup";
        }
        history.push({ pathname: path, state: data });
    };

    static loginUser = async (response) => {
        sessionStorage.setItem("userId", response.id);
        sessionStorage.setItem("username", response.username);
        sessionStorage.setItem("token", response.token);
        const data = await ProfileAPI.getProfileIcon();
        sessionStorage.setItem("image", data.image);
    };
}

export default AuthController;
