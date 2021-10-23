import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renders enter email page upon opening App", () => {
    render(<App />);
    const enterEmailLabel = screen.getByText("Email Address");
    const enterEmailIniput = screen.getByRole("textbox");
    const nextButton = screen.getByText("NEXT");
    expect(enterEmailLabel).toBeInTheDocument();
    expect(enterEmailIniput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
});
