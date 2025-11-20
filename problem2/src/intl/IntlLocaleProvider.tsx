import { IntlProvider } from "react-intl";
import en from "./en.json";
import { useLocale } from "./locale";

type Messages = {
  [key: string]: { [key: string]: { defaultMessage: string } };
};

const messages: Messages = {
  en,
};

const IntlLocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { locale } = useLocale();

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="en"
      messages={Object.entries(messages[locale]).reduce((acc, val) => {
        return { ...acc, [val[0]]: val[1]?.defaultMessage };
      }, {})}
    >
      {children}
    </IntlProvider>
  );
};
export default IntlLocaleProvider;
