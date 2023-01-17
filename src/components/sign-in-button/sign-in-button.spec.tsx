import "@testing-library/jest-dom";
import { getByText, render, screen } from "@testing-library/react";
import SignInButton from ".";

jest.mock("@/services/translate", () => ({
  getTranslation: jest.fn(() => ({
    signInWithGoogle: "Sign in with Google",
  })),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => {
    return {
      locale: "en",
    };
  }),
}));

describe("Sign in button", () => {
  it("should render the button with the correct text", () => {
    const { getByText } = render(<SignInButton />);

    const imgSvg = screen.getByRole("img");

    expect(getByText("Sign in with Google")).toBeInTheDocument();
    expect(imgSvg).toHaveAttribute("src", "/icons/google.svg");
    expect(imgSvg).toHaveAttribute("alt", "Google Logo");
  });
});
