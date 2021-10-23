import React from "react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "../../../components/header/Header";

test("Header contains logo image", () => {
    render(<Header/>);
    const logo = screen.getByAltText("knotwork-logo");
    expect(logo).toBeInTheDocument();
});

test("Header contains profile icon", () => {
    render(<Header />);
    const profileIcon = screen.getByAltText("User profile picture");
    expect(profileIcon).toBeInTheDocument();
})

test("Header contains popularity counter", () => {
    render(<Header />);
    const popularityCounter = screen.getByTestId("popularity-counter--value");
    expect(popularityCounter).toBeInTheDocument();
})

test("Header contains dark mode toggle", () => {
    render(<Header />);
    const darkModeToggle = screen.getByTestId("dark-mode-toggle");
    expect(darkModeToggle).toBeInTheDocument();
});

test("Clicking on header logo redirects to groups page (not logged in)", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Header />
        </Router>
    );
    const logo = screen.getByAltText("knotwork-logo");
    userEvent.click(logo);
    expect(history.location.pathname).toBe("/");
});

test("Clicking on header logo redirects to home page", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Header />
        </Router>
    );
    const logo = screen.getByAltText("knotwork-logo");
    userEvent.click(logo);
    expect(history.location.pathname).toBe("/");
});
