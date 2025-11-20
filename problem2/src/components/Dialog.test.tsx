import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "../test/customRender";
import Dialog from "./Dialog";

describe("Dialog", () => {
  const mockOnClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Render with open = true", async () => {
    render(<Dialog open={true} onClose={mockOnClose} />);
    const dialog = screen.getByTestId("dialog-container");
    expect(dialog).toBeInTheDocument();
  });

  it("Render with open = false", async () => {
    render(<Dialog open={false} onClose={mockOnClose} />);
    const dialog = screen.queryByTestId("dialog-container");
    expect(dialog).not.toBeInTheDocument();
  });

  it("Render with title", async () => {
    const title = "Test Title";
    render(<Dialog open={true} onClose={mockOnClose} title={title} />);
    const dialogTitle = screen.getByText(title);
    expect(dialogTitle).toBeInTheDocument();
  });

  it("Trigger onClose when click backdrop", async () => {
    render(<Dialog open={true} onClose={mockOnClose} />);
    const backdrop = screen.getByTestId("dialog-backdrop");
    expect(backdrop).toBeInTheDocument();
    backdrop.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
