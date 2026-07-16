import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Board from "../components/Board";
import type { Winner } from "../types/game";

function renderBoard({
  aiMode = false,
  ai = "o",
  human = "x",
  winnerSetter = vi.fn(),
}: {
  aiMode?: boolean;
  ai?: "x" | "o";
  human?: "x" | "o";
  winnerSetter?: React.Dispatch<React.SetStateAction<Winner>>;
} = {}) {
  const view = render(
    <MemoryRouter>
      <Board
        aiMode={aiMode}
        ai={ai}
        human={human}
        winnerSetter={winnerSetter}
      />
    </MemoryRouter>,
  );

  const cells = Array.from(
    view.container.querySelectorAll<HTMLButtonElement>(".cell"),
  );

  return {
    ...view,
    cells,
    winnerSetter,
  };
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Board", () => {
  it("renders an empty board with the first player active", () => {
    const { cells } = renderBoard();

    expect(cells).toHaveLength(9);
    expect(screen.getByText("1st player's turn")).toBeInTheDocument();
    expect(screen.getByText("1st player").closest(".player")).toHaveClass(
      "player_active",
    );
  });

  it("plays two-player moves and reports a winner", async () => {
    const user = userEvent.setup();
    const winnerSetter = vi.fn();
    const { cells } = renderBoard({ winnerSetter });

    await user.click(cells[0]);
    await user.click(cells[3]);
    await user.click(cells[1]);
    await user.click(cells[4]);
    await user.click(cells[2]);

    expect(screen.getByText("1st player won!")).toBeInTheDocument();
    expect(cells[0]).toHaveClass("cell_win");
    expect(cells[1]).toHaveClass("cell_win");
    expect(cells[2]).toHaveClass("cell_win");

    await waitFor(() => expect(winnerSetter).toHaveBeenLastCalledWith("x"));
  });

  it("does not allow moves after the game is won", async () => {
    const user = userEvent.setup();
    const { cells } = renderBoard();

    await user.click(cells[0]);
    await user.click(cells[3]);
    await user.click(cells[1]);
    await user.click(cells[4]);
    await user.click(cells[2]);
    await user.click(cells[8]);

    expect(cells[8]).toHaveTextContent("");
  });

  it("resets board state and winner when restarted", async () => {
    const user = userEvent.setup();
    const winnerSetter = vi.fn();
    const { cells, container } = renderBoard({ winnerSetter });

    await user.click(cells[0]);
    await user.click(cells[1]);
    await user.click(within(container).getByRole("button", { name: /restart/i }));

    expect(cells[0]).toHaveTextContent("");
    expect(cells[1]).toHaveTextContent("");
    expect(screen.getByText("1st player's turn")).toBeInTheDocument();
    expect(winnerSetter).toHaveBeenLastCalledWith(null);
  });

  it("blocks human clicks while AI is thinking and then applies AI move", async () => {
    const user = userEvent.setup();
    const { cells } = renderBoard({ aiMode: true });

    await user.click(cells[0]);
    expect(cells[0]).toHaveTextContent("x");
    expect(screen.getByText("AI's turn")).toBeInTheDocument();

    await user.click(cells[1]);
    expect(cells[1]).toHaveTextContent("");

    expect(await screen.findByText("It's your turn", {}, { timeout: 2000 })).toBeInTheDocument();
    expect(cells.filter((cell) => cell.textContent === "o")).toHaveLength(1);
  });
});
