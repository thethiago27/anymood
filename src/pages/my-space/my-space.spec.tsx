import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MySpace from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => {
    return {
      locale: "en",
    };
  }),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(() => {
    return {
      currentUser: {
        status: "authenticated",
      },
    };
  }),
}));

describe("My Space Page", () => {
  it("Should render the My Space Page", () => {
    render(<MySpace />);

    const container = screen.getByTestId("my-space");

    expect(container).toBeInTheDocument();
  });

  it("Should redirect to the home page if the user is not authenticated", () => {
    jest.mock("@/hooks/useAuth", () => ({
      useAuth: jest.fn(() => {
        return {
          currentUser: {
            status: "not-authenticated",
          },
        };
      }),
    }));

    render(<MySpace />);

    expect(window.location.pathname).toBe("/");
  });
});
