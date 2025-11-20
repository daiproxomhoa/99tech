import { render } from "@testing-library/react";
import React from "react";
import IntlLocaleProvider from "../intl/IntlLocaleProvider";
import "../App.css";
import "../index.css";

const customRender = (ui: React.ReactNode, renderOptions = {}) => {
  return render(<IntlLocaleProvider>{ui}</IntlLocaleProvider>, renderOptions);
};

export { customRender as render };
