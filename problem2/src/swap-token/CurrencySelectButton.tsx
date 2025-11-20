import clsx from "clsx";
import { useState } from "react";
import { ArrowIcon } from "../assets";
import InprogressImage from "../components/InprogressImage";
import CurrencySelectDialog from "./CurrencySelectDialog";
import type { CurrencyModel } from "./types";
import { FormattedMessage } from "react-intl";

interface Props {
  value: CurrencyModel | null;
  onChange: (value: CurrencyModel) => void;
  listCurrency?: CurrencyModel[];
}
const CurrencySelectButton = (props: Props) => {
  const { value, onChange, listCurrency } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      {value ? (
        <button
          className={clsx(
            "flex rounded-full p-1 border border-gray-500 items-center cursor-pointer hover:bg-gray-900",
            "gap-2",
            "shrink-0",
            "h-[50px]"
          )}
          onClick={() => setOpen(true)}
          data-testid="currency-select-button"
        >
          <InprogressImage
            src={`/tokens/${value.currency}.svg`}
            alt={value.currency}
            className="size-10 rounded-full"
          />
          <p>{value.currency}</p>
          <ArrowIcon className="size-6 -rotate-90" />
        </button>
      ) : (
        <button
          className={clsx(
            "flex rounded-full py-1 border border-gray-500 items-center cursor-pointer hover:bg-gray-900 text-gray-400 hover:text-white",
            "px-3",
            "h-[50px] shrink-0"
          )}
          onClick={() => setOpen(true)}
          data-testid="currency-select-button"
        >
          <FormattedMessage defaultMessage="Select Currency" id="6P5MmQ" />
        </button>
      )}

      <CurrencySelectDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={onChange}
        listCurrency={listCurrency}
      />
    </>
  );
};
export default CurrencySelectButton;
