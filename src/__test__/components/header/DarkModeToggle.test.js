import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import DarkModeToggle from "../../../components/header/DarkModeToggle";

test("Dark Mode Toggle changes theme in local storage", () => {
    render(<DarkModeToggle />);
    jest.spyOn(window.localStorage.__proto__, "setItem");
    window.localStorage.__proto__.setItem = jest.fn();
    const darkModeToggle = screen.getByTestId("dark-mode-toggle");
    fireEvent(
        darkModeToggle,
        new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    expect(localStorage.setItem).toHaveBeenCalled();
});

test("Dark Mode Toggle only has one icon showing at a time", () => {
    render(<DarkModeToggle />);
    var darkModeToggleIcon = screen.getAllByTestId(
        "dark-mode-toggle--icon"
    );
    expect(darkModeToggleIcon.length).toBe(1);
    fireEvent(
        darkModeToggleIcon[0],
        new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    darkModeToggleIcon = screen.getAllByTestId("dark-mode-toggle--icon");
    expect(darkModeToggleIcon.length).toBe(1);
});
