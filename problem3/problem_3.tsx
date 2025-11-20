interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  priority: number;
  usdValue: number;
}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    return balances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
        usdValue: prices[balance.currency] * balance.amount,
        priority: getPriority(balance.currency),
      };
    });
  }, [balances]);

  const sortedBalances = useMemo(() => {
    return formattedBalances
      .filter((balance: FormattedWalletBalance) => {
        return balance.priority > -99 && balance.amount <= 0;
      })
      .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => {
        return lhs.priority > rhs.priority ? -1 : 1;
      });
  }, [formattedBalances]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    return (
      <WalletRow
        key={balance.currency}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });
  return <div {...rest}>{rows}</div>;
};
