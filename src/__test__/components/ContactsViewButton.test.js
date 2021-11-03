import React from "react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import ContactsViewButton from "../../components/ContactsViewButton";

test("Contacts View Button has Groups and Contacts buttons", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <ContactsViewButton />
        </Router>
    );
    const groupsButton = screen.getByText("Groups");
    const contactsButton = screen.getByText("Contacts");
    expect(groupsButton).toBeInTheDocument();
    expect(contactsButton).toBeInTheDocument();
});

test("Clicking on Contacts button redirects to contacts page", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <ContactsViewButton />
        </Router>
    );
    const contactsButton = screen.getByText("Contacts");
    userEvent.click(contactsButton);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/contacts");
})

test("Clicking on Groups button redirects to groups page", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <ContactsViewButton />
        </Router>
    );
    const contactsButton = screen.getByText("Contacts");
    const groupsButton = screen.getByText("Groups");
    userEvent.click(contactsButton);
    userEvent.click(groupsButton);
    expect(history.location.pathname).toBe("/groups");
});