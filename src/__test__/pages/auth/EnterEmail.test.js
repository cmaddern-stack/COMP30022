import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import EnterEmail from "../../../pages/auth/EnterEmail";
import AuthAPI from "../../../apis/AuthAPI";
import AuthController from "../../../controllers/AuthController";

test("Enter email page has a field for email address and next button", () => {
    render(<EnterEmail />);
    const enterEmailLabel = screen.getByText("Email Address");
    const enterEmailInput = screen.getByRole("textbox");
    const nextButton = screen.getByText("NEXT");
    expect(enterEmailLabel).toBeInTheDocument();
    expect(enterEmailInput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
});

test("Enter email page allows users to type emails", () => {
    render(<EnterEmail />);
    const testEmail = "test@email.com";
    const emailInput = screen.getByRole("textbox");
    const emailError = screen.getByTestId("input-error");
    userEvent.type(emailInput, testEmail);
    expect(emailInput.value).toBe(testEmail);
    expect(emailError.textContent).toBe("");
});

test("Enter email page validates against invalid emails", async () => {
    render(<EnterEmail />);
    const testEmail = "notemail";
    const emailInput = screen.getByRole("textbox");
    await userEvent.type(emailInput, testEmail);
    expect(emailInput.value).toBe(testEmail);
    const emailError = screen.getByText("Email invalid!");
    expect(emailError).toBeInTheDocument();
});

test("Next button on enter email page is disabled if invalid email", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <EnterEmail />
        </Router>
    );
    const testEmail = "invalid email";
    const emailInput = screen.getByRole("textbox");
    const nextButton = screen.getByText("NEXT");
    userEvent.type(emailInput, testEmail);
    userEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
});

test("Next button leads to next page if valid email", async () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <EnterEmail />
        </Router>
    );
    const testEmail = "existing@email.com";
    const emailInput = screen.getByRole("textbox");
    const nextButton = screen.getByText("NEXT");
    await userEvent.type(emailInput, testEmail);
    expect(nextButton).not.toBeDisabled();
});