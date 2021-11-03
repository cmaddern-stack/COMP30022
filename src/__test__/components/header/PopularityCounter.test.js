import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopularityCounter from "../../../components/header/PopularityCounter";

test("Popularity counter always displays a number", () => {
    render(<PopularityCounter />);
    const popularityCounter = screen.getByTestId("popularity-counter--value");
    expect(popularityCounter).toHaveTextContent("0");
});
