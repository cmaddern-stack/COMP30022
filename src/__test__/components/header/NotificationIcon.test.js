import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotificationIcon from "../../../components/header/NotificationIcon";

test("Notification Icon initially does not show dropdown", () => {
    render(<NotificationIcon/>);
    var notifications = screen.queryAllByRole("listitem");
    expect(notifications.length).toBe(0);
})

test("Notification Icon shows notifications when clicked", () => {
    render(<NotificationIcon />);
    const notificationIcon = screen.getByTestId("notification-icon");
    userEvent.click(notificationIcon);
    var notifications = screen.queryAllByRole("listitem");
    expect(notifications.length).toBeGreaterThan(0);
});

test("Notifications are hidden when clicked twice", () => {
    render(<NotificationIcon />);
    const notificationIcon = screen.getByTestId("notification-icon");
    userEvent.click(notificationIcon);
    userEvent.click(notificationIcon);
    var notifications = screen.queryAllByRole("listitem");
    expect(notifications.length).toBe(0);
})