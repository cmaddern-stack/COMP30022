import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders enter email page", () => {
    render(<App />);
    const enterEmailLabel = screen.getByText("Email Address");
    const enterEmailIniput = screen.getByRole("textbox");
    const nextButton = screen.getByText("NEXT");
    expect(enterEmailLabel).toBeInTheDocument();
    expect(enterEmailIniput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
});
