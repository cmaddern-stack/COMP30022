import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../../pages/auth/Login";

test("Login page has fields for email address and password", () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "",
            },
        },
        match: {},
    };
    render(<Login {...routeComponentPropsMock} />);
    const enterEmailLabel = screen.getByText("Email Address");
    const passwordLabel = screen.getByText("Password");
    expect(enterEmailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
});

test("Login page has back and login buttons", () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "",
            },
        },
        match: {},
    };
    render(<Login {...routeComponentPropsMock} />);
    const nextButton = screen.getByText("LOGIN");
    const backButton = screen.getByText("BACK");
    expect(nextButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
});

test("Login page login button is disabled initially", () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "test@gmail.com",
            },
        },
        match: {},
    };
    render(<Login {...routeComponentPropsMock} />);
    const nextButton = screen.getByText("LOGIN");
    const backButton = screen.getByText("BACK");
    expect(nextButton).toBeDisabled();
    expect(backButton).not.toBeDisabled();
});

test("Login page next button is enabled when user types valid inputs", async () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "test@gmail.com",
            },
        },
        match: {},
    };
    render(<Login {...routeComponentPropsMock} />);
    const passwordInput = screen.getByTestId("password");
    const nextButton = screen.getByText("LOGIN");
    await userEvent.type(passwordInput, "validPassword");
    expect(nextButton).not.toBeDisabled();
});

test("Login page validates against emails", async () => {
    const routeComponentPropsMock = {
        history: {},
        location: {
            state: {
                email: "",
            },
        },
        match: {},
    };
    render(<Login {...routeComponentPropsMock} />);
    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByTestId("password");
    const nextButton = screen.getByText("LOGIN");
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "validPassword");
    expect(nextButton).toBeDisabled();
});
