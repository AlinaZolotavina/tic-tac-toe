import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import App from "../components/App";

afterEach(() => {
  cleanup();
});

function renderApp(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App integration", () => {
  it("plays a two-player turn sequence and restarts the board", async () => {
    const user = userEvent.setup();
    const { container } = renderApp();

    await user.click(screen.getByRole("button", { name: /two players/i }));

    expect(screen.getByText("1st player's turn")).toBeInTheDocument();

    const cells = Array.from(
      container.querySelectorAll<HTMLButtonElement>(".cell"),
    );

    await user.click(cells[0]);
    expect(cells[0]).toHaveTextContent("x");
    expect(screen.getByText("2nd player's turn")).toBeInTheDocument();

    await user.click(cells[1]);
    expect(cells[1]).toHaveTextContent("o");
    expect(screen.getByText("1st player's turn")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /restart/i }));
    expect(cells[0]).toHaveTextContent("");
    expect(cells[1]).toHaveTextContent("");
  });

  it("navigates through single-player shape selection", async () => {
    const user = userEvent.setup();
    const { container } = renderApp();

    await user.click(screen.getByRole("button", { name: /single player/i }));

    expect(screen.getByText("Choose your side ;)")).toBeInTheDocument();

    const crossOption = container.querySelector<HTMLButtonElement>(
      ".shape-selection__option.cross",
    );

    expect(crossOption).not.toBeNull();
    await user.click(crossOption!);

    expect(screen.getByText("It's your turn")).toBeInTheDocument();
    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });
});
