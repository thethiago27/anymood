import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProfileHeader from ".";
import React from "react";

describe("Profile Header Component", () => {
  it("Should render the Profile Header Component", () => {
    render(<ProfileHeader />);

    const container = screen.getByTestId("profile-header");

    expect(container).toBeInTheDocument();
  });

  it("Should render the user image", () => {
    render(<ProfileHeader />);

    const userImage = screen.getByAltText("Profile");

    expect(userImage).toBeInTheDocument();
  });
});
