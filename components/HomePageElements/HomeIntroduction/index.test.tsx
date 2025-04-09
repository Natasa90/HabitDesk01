import { render, fireEvent } from "@testing-library/react-native";
import HomeIntroduction from ".";

jest.mock("@/lib/hooks/useTypedNavigation", () => ({
  useTypedNavigation: () => ({
    navigate: jest.fn(),
  }),
}));


describe("HomeIntroduction", () => {
  it("renders welcome text and Get Started button", () => {
    const { getByText } = render(<HomeIntroduction />);
    
    expect(getByText("Welcome to HabitDesk!")).toBeTruthy();

    expect(getByText("Get Started")).toBeTruthy();
  });

  it("navigates to Login when Get Started button is pressed", () => {
    const navigateMock = jest.fn();

    jest.mocked(require("@/lib/hooks/useTypedNavigation")).useTypedNavigation.mockReturnValue({
      navigate: navigateMock,
    });

    const { getByText } = render(<HomeIntroduction />);
    const button = getByText("Get Started");

    fireEvent.press(button);

    expect(navigateMock).toHaveBeenCalledWith("Login");
  });
});