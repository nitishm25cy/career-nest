
import { render, screen } from "@testing-library/react";

function TestComponent() {
  return <h1>CareerNest Testing Setup</h1>;
}

describe("CareerNest testing setup", () => {
  test("renders the test heading", () => {
    render(<TestComponent />);

    expect(
      screen.getByRole("heading", {
        name: "CareerNest Testing Setup",
      })
    ).toBeInTheDocument();
  });
});
