import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Layout from ".";

describe("Layout Component", () => {
  it("Should render the Layout Component", () => {
    render(<Layout>Test</Layout>);

    const container = screen.getByTestId("layout");

    expect(container).toBeInTheDocument();
  });

  it("Should render the Layout Component with children", () => {
    render(<Layout>Test</Layout>);

    const container = screen.getByTestId("layout");
    const children = screen.getByText(/Test/i);

    expect(container).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });
});
