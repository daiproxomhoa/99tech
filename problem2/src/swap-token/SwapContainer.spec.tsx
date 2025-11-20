import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "../test/customRender";
import SwapContainer from "./SwapContainer";

async function setupSwap() {
  const swapBtn = await screen.findByTestId("swap-button");
  expect(swapBtn).toBeDisabled();
}

async function selectCurrency(currency: string, direction: "from" | "to") {
  const toCurrencyBtn = (
    await screen.findAllByTestId("currency-select-button")
  ).at(direction === "from" ? 0 : 1)!;
  userEvent.click(toCurrencyBtn);

  const currencyBtn = await screen.findByTestId(`currency-item-${currency}`);
  userEvent.click(currencyBtn);
}

async function enterFromValue(value: string) {
  const fromInput = await screen.findByTestId("from-currency-input");
  fireEvent.change(fromInput, { target: { value } });
  return fromInput;
}

async function expectToValue(value: string) {
  const toInput = (await screen.findByTestId(
    "to-currency-input"
  )) as HTMLInputElement;
  expect(toInput.value).toBe(value);
  return toInput;
}

describe("SwapContainer", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Swap USD => LUNA", async () => {
    render(<SwapContainer />);
    await setupSwap();
    await selectCurrency("LUNA", "to");
    enterFromValue("10");
    const swapBtn = await screen.findByTestId("swap-button");
    userEvent.click(swapBtn);
    await waitFor(() => expectToValue("24.416662"), { timeout: 3000 });
  });
  it("Convert to $ label", async () => {});
  it("Swap currency USD <=> LUNA", async () => {
    render(<SwapContainer />);
    await setupSwap();
    await selectCurrency("LUNA", "to");
    enterFromValue("10");
    const swapBtn = await screen.findByTestId("swap-button");
    userEvent.click(swapBtn);
    await waitFor(() => expectToValue("24.416662"), { timeout: 3000 });
    const btn = await screen.findByTestId("swap-currency-button");
    userEvent.click(btn);
    await waitFor(async () => {
      const fromInput = (await screen.findByTestId(
        "from-currency-input"
      )) as HTMLInputElement;
      expect(fromInput.value).toBe("24.416662");
      expectToValue("");
    });
  });

  it("Swap currency to USD", async () => {
    render(<SwapContainer />);
    await setupSwap();
    await selectCurrency("LUNA", "from");
    enterFromValue("10");
    await waitFor(async () => {
      const label = await screen.findByTestId("from-currency-usd-label");
      expect(label.textContent).toBe("$10.00");
    });
  });
});
