// Importing necessary functions from React Testing Library
import { render, screen } from "@testing-library/react";
import App from "./App";

// Test function to check if the "learn react" link is rendered
test("renders learn react link", () => {
  render(<App />); // Rendering the App component
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
