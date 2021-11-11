import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../../../pages/auth/SignUp";

test("Sign Up page has fields for email address, first name, last name, password and confirm password.", () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "",
            },
        },
        match: {},
    };
    render(<SignUp {...routeComponentPropsMock} />);
    const enterEmailLabel = screen.getByText("Email Address");
    const firstNameLabel = screen.getByText("First Name");
    const lastNameLabel = screen.getByText("Last Name");
    const passwordLabel = screen.getByText("Password");
    const confirmPasswordLabel = screen.getByText("Confirm Password");
    expect(enterEmailLabel).toBeInTheDocument();
    expect(firstNameLabel).toBeInTheDocument();
    expect(lastNameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
});

test("Sign Up page has back and sign up buttons", () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "",
            },
        },
        match: {},
    };
    render(<SignUp {...routeComponentPropsMock} />);
    const nextButton = screen.getByText("SIGN UP");
    const backButton = screen.getByText("BACK");
    expect(nextButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
});

test("Sign Up page email field is initailly passed in via props location", () => {
    const email = "test@gmail.com";
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: email,
            },
        },
        match: {},
    };
    render(<SignUp {...routeComponentPropsMock} />);
    const emailInput = screen.getByTestId("email");
    expect(emailInput.value).toBe(email);
});

test("Sign Up page sign up button is disabled initially", () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "test@gmail.com",
            },
        },
        match: {},
    };
    render(<SignUp {...routeComponentPropsMock} />);
    const nextButton = screen.getByText("SIGN UP");
    const backButton = screen.getByText("BACK");
    expect(nextButton).toBeDisabled();
    expect(backButton).not.toBeDisabled();
});

test("Sign Up page sign up button is enabled when user types valid inputs", async () => {
    const password = "validPassword123";
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "test@gmail.com",
            },
        },
        match: {},
    };
    render(<SignUp {...routeComponentPropsMock} />);
    const firstNameInput = screen.getByTestId("firstName");
    const lastNameInput = screen.getByTestId("lastName");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
    const nextButton = screen.getByText("SIGN UP");
    await userEvent.type(firstNameInput, "First Name");
    await userEvent.type(lastNameInput, "Last Name");
    await userEvent.type(passwordInput, password);
    await userEvent.type(confirmPasswordInput, password);
    expect(nextButton).not.toBeDisabled();
});

test("Sign Up page sign up button is disabled when password is too weak", async () => {
    const password = "weakPassword";
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "test@gmail.com",
            },
        },
        match: {},
    };
    render(<SignUp {...routeComponentPropsMock} />);
    const firstNameInput = screen.getByTestId("firstName");
    const lastNameInput = screen.getByTestId("lastName");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
    const nextButton = screen.getByText("SIGN UP");
    await userEvent.type(firstNameInput, "First Name");
    await userEvent.type(lastNameInput, "Last Name");
    await userEvent.type(passwordInput, password);
    await userEvent.type(confirmPasswordInput, password);
    expect(nextButton).toBeDisabled();
});

