import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import IntlLocaleProvider from "./intl/IntlLocaleProvider";
import SwapContainer from "./swap-token/SwapContainer";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <SwapContainer /> },
  ]);

  return (
    <IntlLocaleProvider>
      <RouterProvider router={router} />
    </IntlLocaleProvider>
  );
};

export default App;
