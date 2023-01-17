import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Header Component", () => {
  it("Should render correctly", () => {
    render(<Header />);

    const container = screen.getByTestId("header");

    expect(container).toBeInTheDocument();
  });

  it("Should render the logo", () => {
    render(<Header />);

    const logo = screen.getByRole("img");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.svg");
    expect(logo).toHaveAttribute("alt", "AnyMood");
  });
});
