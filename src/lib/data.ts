export interface PriceData {
  price: number | null;
  change: number | null;
}

export interface Prices {
  btc: PriceData;
  eth: PriceData;
}

// Mock data nếu cần
export const PI_MOCK_PRICE = 1.42;
export const PI_MOCK_CHANGE = 5.21;
