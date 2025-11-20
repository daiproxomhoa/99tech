import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencySelectButton from "./CurrencySelectButton";
import { mockCurrency, mockListCurrency } from "./constants";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "../test/customRender";

describe("CurrencySelectButton", () => {
  const mockOnChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Render with value", async () => {
    render(
      <CurrencySelectButton
        value={mockCurrency}
        onChange={mockOnChange}
        listCurrency={mockListCurrency}
      />
    );
    expect(screen.getByText("USD")).toBeInTheDocument();
    const btn = screen.getByTestId("currency-select-button");
    expect(btn).toBeInTheDocument();
  });
  it("Render without value", async () => {
    render(
      <CurrencySelectButton
        value={null}
        onChange={mockOnChange}
        listCurrency={mockListCurrency}
      />
    );
    expect(screen.getByText("Select Currency")).toBeInTheDocument();
    const btn = screen.getByTestId("currency-select-button");
    expect(btn).toBeInTheDocument();
  });

  it("Select currency", async () => {
    render(
      <CurrencySelectButton
        value={null}
        onChange={mockOnChange}
        listCurrency={mockListCurrency}
      />
    );
    expect(screen.getByText("Select Currency")).toBeInTheDocument();
    const btn = screen.getByTestId("currency-select-button");
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    await waitFor(() => {
      const lunaBtn = screen.getByTestId("currency-item-LUNA");
      expect(lunaBtn).toBeInTheDocument();
      lunaBtn.click();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ currency: "LUNA" })
      );
      expect(screen.getByText("LUNA")).toBeInTheDocument();
    });
  });
});
