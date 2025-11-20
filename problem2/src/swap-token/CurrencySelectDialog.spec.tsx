import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CurrencySelectDialog from "./CurrencySelectDialog";
import { mockCurrency, mockListCurrency } from "./constants";
import { render } from "../test/customRender";

describe("CurrencySelectDialog", () => {
  const mockOnChange = vi.fn();
  const mockOnClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it("Render without value", async () => {
    render(
      <CurrencySelectDialog
        onChange={mockOnChange}
        value={null}
        listCurrency={mockListCurrency}
        open={true}
        onClose={mockOnClose}
      />
    );
    const btn = screen.getByTestId("dialog-container");
    expect(btn).toBeInTheDocument();
  });

  it("Render with value", async () => {
    render(
      <CurrencySelectDialog
        onChange={mockOnChange}
        value={mockCurrency}
        listCurrency={mockListCurrency}
        open={true}
        onClose={mockOnClose}
      />
    );
    const btn = screen.getByTestId("dialog-container");
    expect(btn).toBeInTheDocument();
    const selectedCurrencyButton = screen.getByTestId(
      `currency-item-${mockCurrency.currency}`
    );
    expect(selectedCurrencyButton).toBeInTheDocument();
    expect(selectedCurrencyButton).toHaveClass("bg-gray-700");
  });

  it("Trigger onChange when select currency", async () => {
    render(
      <CurrencySelectDialog
        onChange={mockOnChange}
        value={null}
        listCurrency={mockListCurrency}
        open={true}
        onClose={mockOnClose}
      />
    );

    const lunaBtn = screen.getByTestId("currency-item-LUNA");
    expect(lunaBtn).toBeInTheDocument();
    lunaBtn.click();

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ currency: "LUNA" })
    );
    expect(screen.getByText("LUNA")).toBeInTheDocument();
  });
});
