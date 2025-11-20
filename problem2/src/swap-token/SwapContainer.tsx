import clsx from "clsx";
import uniqBy from "lodash/uniqBy";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ArrowDownIcon } from "../assets";
import InprogressImage from "../components/InprogressImage";
import { CURRENCY_REGEX, formatCurrency, parseCurrency } from "./constants";
import CurrencySelectButton from "./CurrencySelectButton";
import type { CurrencyInputModel, CurrencyModel } from "./types";

function SwapContainer() {
  const [listCurrency, setListCurrency] = useState<CurrencyModel[]>([]);
  const [fromCurrency, setFromCurrency] = useState<CurrencyInputModel>({
    value: "",
    currency: {
      currency: "USD",
      date: "",
      price: 1, // Default price to 1 for initial state
    },
  });

  const [toCurrency, setToCurrency] = useState<CurrencyModel | null>(null);
  const canSwap = fromCurrency.value && fromCurrency.currency && toCurrency;
  const [toCurrencyValue, setToCurrencyValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getTokenPrice = useCallback(async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setListCurrency(uniqBy(data, (a) => a.currency));
  }, []);

  const getSwapValue = useCallback(async () => {
    setLoading(true);
    await getTokenPrice();
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    const toCurrencyValue =
      fromCurrency.value && fromCurrency.currency && toCurrency
        ? (
            (parseCurrency(fromCurrency.value) * fromCurrency.currency?.price) /
            toCurrency.price
          ).toFixed(6)
        : "";
    setToCurrencyValue(toCurrencyValue);
    setLoading(false);
  }, [fromCurrency.currency, fromCurrency.value, getTokenPrice, toCurrency]);

  const onSwapCurrency = useCallback(() => {
    setFromCurrency((old) => ({
      ...old,
      currency: toCurrency,
    }));
    setToCurrency(fromCurrency.currency);
    setFromCurrency((old) => ({ ...old, value: toCurrencyValue }));
    setToCurrencyValue("");
  }, [fromCurrency.currency, toCurrency, toCurrencyValue]);

  useEffect(() => {
    getTokenPrice();
  }, [getTokenPrice]);

  return (
    <>
      <div className="flex flex-col w-lg gap-2 relative">
        <div className="overflow-hidden flex flex-col items-start gap-2 rounded-2xl border border-gray-600 hover:border-gray-500 w-full p-3">
          <p className="text-xl font-semibold text-gray-500">
            <FormattedMessage defaultMessage="Sell" id="9AgXoz" />
          </p>
          <div className="flex gap-2 w-full">
            <input
              autoComplete="off"
              placeholder="0"
              autoCapitalize="sentences"
              autoCorrect="on"
              dir="auto"
              inputMode="decimal"
              spellCheck="true"
              data-disable-theme="true"
              className={clsx(
                fromCurrency.value.length < 20
                  ? "text-4xl"
                  : fromCurrency.value.length < 24
                  ? "text-3xl"
                  : "text-2xl",
                "w-full bg-transparent text-white outline-none placeholder:text-gray-600 min-h-10 transition-all duration-200"
              )}
              disabled={!fromCurrency.currency}
              value={fromCurrency.value}
              onChange={(e) => {
                const value = e.target.value.trim();
                if (CURRENCY_REGEX.test(value) || !value) {
                  setFromCurrency((old) => ({ ...old, value }));
                }
              }}
              data-testid="from-currency-input"
            />
            <CurrencySelectButton
              value={fromCurrency.currency}
              onChange={(currency) => {
                setFromCurrency((old) => ({ ...old, currency }));
              }}
              listCurrency={listCurrency}
            />
          </div>
          <p
            className="text-sm font-semibold text-gray-500 line-clamp-1"
            style={{
              lineClamp: 1,
            }}
            data-testid="from-currency-usd-label"
          >
            {formatCurrency(
              parseCurrency(fromCurrency.value) *
                (fromCurrency.currency?.price || 1)
            )}
          </p>
        </div>
        {/*  */}
        <button
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-14px)] z-10 border-6 border-gray-950",
            "flex items-center justify-center size-14 bg-gray-800 hover:bg-gray-700 rounded-xl"
          )}
          data-testid="swap-currency-button"
          onClick={onSwapCurrency}
        >
          <ArrowDownIcon className="size-7" />
        </button>
        {/*  */}
        <div
          className={clsx(
            "flex flex-col items-start gap-2 rounded-2xl border border-gray-600 hover:border-gray-500 w-full p-3  bg-[#10182894]",
            "hover:[&_#token-icon]:translate-y-0 hover:[&_#token-icon]:opacity-100"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-semibold text-gray-500">
              <FormattedMessage defaultMessage="Buy" id="EnCOBJ" />
            </p>
            {!toCurrency && (
              <div className="flex flex-row-reverse gap-1">
                {listCurrency?.splice(0, 3).map((value, index) => {
                  return (
                    <InprogressImage
                      key={value.currency}
                      onClick={() => setToCurrency(value)}
                      src={`/tokens/${value.currency}.svg`}
                      alt={value.currency}
                      id="token-icon"
                      className={clsx(
                        "size-6 rounded-full border-2 border-gray-600 hover:border-gray-500 cursor-pointer",
                        "opacity-0 -translate-y-1/2 transition-all duration-200"
                      )}
                      style={{
                        transitionDelay: `${index * 0.04}s`,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex gap-2 w-full">
            <input
              autoComplete="off"
              placeholder="0"
              autoCapitalize="sentences"
              autoCorrect="on"
              dir="auto"
              inputMode="decimal"
              spellCheck="true"
              data-disable-theme="true"
              className={clsx(
                toCurrencyValue.length < 20
                  ? "text-4xl"
                  : toCurrencyValue.length < 24
                  ? "text-3xl"
                  : "text-2xl",
                "w-full text-white outline-none placeholder:text-gray-600 min-h-10 transition-all duration-200"
              )}
              value={toCurrencyValue}
              readOnly
              data-testid="to-currency-input"
            />
            <CurrencySelectButton
              value={toCurrency}
              onChange={setToCurrency}
              listCurrency={listCurrency}
            />
          </div>
        </div>
      </div>
      <button
        disabled={!canSwap || loading}
        onClick={getSwapValue}
        className="mt-3 flex items-center justify-center rounded-2xl border w-full p-3 text-3xl text-gray-400 hover:text-white disabled:bg-slate-900 disabled:cursor-not-allowed border-gray-600 hover:border-gray-500"
        data-testid="swap-button"
      >
        {loading && (
          <svg
            className="mr-3 -ml-1 size-7 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <FormattedMessage defaultMessage="Swap" id="s8BnAC" />
      </button>
    </>
  );
}

export default SwapContainer;
