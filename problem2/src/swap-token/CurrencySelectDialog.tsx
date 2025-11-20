import clsx from "clsx";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ArrowIcon, SearchIcon } from "../assets";
import Dialog from "../components/Dialog";
import InprogressImage from "../components/InprogressImage";
import type { CurrencyModel } from "./types";

interface Props {
  value: CurrencyModel | null;
  onChange: (value: CurrencyModel) => void;
  open?: boolean;
  onClose?: () => void;
  listCurrency?: CurrencyModel[];
}
const CurrencySelectDialog = (props: Props) => {
  const { value, onChange, open, onClose, listCurrency } = props;
  const intl = useIntl();
  const [search, setSearch] = useState("");

  const filteredCurrency =
    listCurrency?.filter((item) =>
      item.currency.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        title={
          <FormattedMessage defaultMessage="Select Currency" id="6P5MmQ" />
        }
      >
        <div className="pb-3 px-4">
          <div className="flex items-center px-3 py-1 gap-3 rounded-full bg-gray-800">
            <SearchIcon className="size-6 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 min-h-10"
              placeholder={intl.formatMessage({
                defaultMessage: "Search currency",
                id: "PloJYE",
              })}
              autoFocus
            />
            <ArrowIcon className="size-6 -rotate-90" />
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-auto">
          {filteredCurrency?.length > 0 ? (
            filteredCurrency?.map((item) => {
              const checked = value?.currency === item.currency;
              return (
                <div
                  key={item.currency}
                  className={clsx(
                    "flex gap-2 items-center px-3 py-2 hover:bg-gray-700 cursor-pointer",
                    checked ? "bg-gray-700" : "bg-transparent"
                  )}
                  onClick={() => {
                    onChange?.(item);
                    onClose?.();
                  }}
                  data-testid={`currency-item-${item.currency}`}
                >
                  <InprogressImage
                    src={`/tokens/${item.currency}.svg`}
                    alt={item.currency}
                    className="size-10 rounded-full"
                  />
                  <p>{item.currency}</p>
                </div>
              );
            })
          ) : (
            <p className="mb-3 min-h-40 flex justify-center items-center">
              <FormattedMessage
                defaultMessage="Currency not found"
                id="HO8Qfw"
              />
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
};
export default CurrencySelectDialog;
