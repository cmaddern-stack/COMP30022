import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactCardStar from "../../../components/groups/ContactCardStar";
import ContactsAPI from "../../../apis/contactsApi";

test("Contact Card Star shows star outline when not starred", () => {
    render(<ContactCardStar starred={false} />);
    const star = screen.getByTestId("contact-card-star--unstarred");
    const starOutline = screen.queryByTestId("contact-card-star--starred");
    expect(star).toBeInTheDocument();
    expect(starOutline).not.toBeInTheDocument();
});

test("Contact Card Star shows filled star when starred", () => {
    render(<ContactCardStar starred={true} />);
    const star = screen.queryByTestId("contact-card-star--unstarred");
    const starOutline = screen.getByTestId("contact-card-star--starred");
    expect(star).not.toBeInTheDocument();
    expect(starOutline).toBeInTheDocument();
});

test("Contact Card Star calls API on click", () => {
    const mockToggleStar = jest.fn();
    delete window.location;
    window.location = {
        reload: jest.fn(),
    };
    ContactsAPI.toggleStar = mockToggleStar;
    render(<ContactCardStar starred={true} />);
    const star = screen.getByTestId("contact-card-star");
    userEvent.click(star);
    expect(mockToggleStar).toHaveBeenCalled();
});
