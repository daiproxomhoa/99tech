export interface CurrencyModel {
  currency: string;
  date: string;
  price: number;
}

export interface CurrencyInputModel {
  value: string;
  currency: CurrencyModel | null;
}
