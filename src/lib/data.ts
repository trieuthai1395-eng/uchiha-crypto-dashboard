export interface PriceData {
  price: number | null;
  change: number | null;
}

export interface Prices {
  btc: PriceData;
  eth: PriceData;
}
