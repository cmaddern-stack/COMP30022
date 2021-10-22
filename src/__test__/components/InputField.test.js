import { render, screen } from "@testing-library/react";
import InputField from "../../components/InputField";

test("render input field component", () => {
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
