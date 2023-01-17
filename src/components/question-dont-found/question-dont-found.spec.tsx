import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import QuestionDontFound from ".";

jest.mock("@/services/translate", () => ({
  getTranslation: jest.fn(() => ({
    questionDontFoundText:
      "This question does not exist! Or it was deleted. How about, create your own?",
  })),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => {
    return {
      locale: "en",
    };
  }),
}));

describe("Question Don't Found Component", () => {
  it("Should render the component", () => {
    render(<QuestionDontFound />);
    expect(
      screen.getByText(
        "This question does not exist! Or it was deleted. How about, create your own?"
      )
    ).toBeInTheDocument();
  });
});
