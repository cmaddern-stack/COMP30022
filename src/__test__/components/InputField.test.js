import React, { useState } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../../components/InputField";

test("Render input field component", () => {
    // initialise component
    const label = "test-label";
    const value = "test-value";
    render(
        <InputField
            name="test-input"
            label={label}
            type="text"
            placeholder="test-placeholder"
            onChange={() => {}}
            value={value}
            error={""}
        />
    );
    // find elements
    const labelElement = screen.getByText(label);
    const inputElement = screen.getByRole("textbox");
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);
});

test("Typing into input field component", () => {
    const userInput = "test typing...";
    function Wrapper() {
        const [value, setValue] = useState("");
        const onChange = (event) => {
            setValue(event.target.value);
        };
        return (
            <InputField
                name="test-input"
                label="test-label"
                type="text"
                placeholder="test-placeholder"
                onChange={onChange}
                value={value}
                error={""}
            />
        );
    }
    render(<Wrapper />);
    const inputElement = screen.getByRole("textbox");
    userEvent.type(inputElement, userInput);
    expect(inputElement.value).toBe(userInput);
});

test("Input field component shows errors", () => {
    const error = "Error value!";
    render(
        <InputField
            name="test-input"
            label="test-label"
            type="text"
            placeholder="test-placeholder"
            onChange={null}
            value=""
            error={error}
        />
    );
    const inputError = screen.getByTestId("input-error");
    expect(inputError.textContent).toBe(error);
});
