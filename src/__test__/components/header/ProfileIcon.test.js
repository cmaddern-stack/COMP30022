import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import ProfileIcon from "../../../components/header/ProfileIcon";

test("Profile Icon renders an image", () => {
    render(<ProfileIcon />);
    const profileIcon = screen.getByRole("img");
    expect(profileIcon).toBeInTheDocument();
});

test("Profile Icon renders Navigation menu when clicked", () => {
    render(<ProfileIcon />);
    const profileIcon = screen.getByRole("img");
    var navMenu = screen.queryAllByRole("listitem");
    expect(navMenu.length).toBe(0);
    fireEvent(
        profileIcon,
        new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    navMenu = screen.queryAllByRole("listitem");
    expect(navMenu.length).not.toBe(0);
});

test("Profile Icon closes Navigation menu when clicked again", () => {
    render(<ProfileIcon />);
    const profileIcon = screen.getByRole("img");
    fireEvent(
        profileIcon,
        new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    fireEvent(
        profileIcon,
        new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    var navMenu = screen.queryAllByRole("listitem");
    expect(navMenu.length).toBe(0);
});
