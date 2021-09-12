import React from "react";
import validator from "validator";
import InputField from "../components/InputField";

class AuthController {
    static emailChangeHandler = async (email) => {
        var error, valid;
        // validate email address
        if (validator.isEmail(email)) {
            error = "";
            valid = true;
        } else {
            error = "Email invalid!";
            valid = false;
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

    static passwordChangeHandler = async (password) => {
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
}

export default AuthController;
