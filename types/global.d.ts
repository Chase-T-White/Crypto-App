export {};

declare global {
  interface Coins {
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    roi: null;
    sparkline_in_7d: {
      price: number[];
    };
    symbol: string;
    total_supply: number;
    total_volume: number;
  }
  interface CoinChart {
    id: string;
    symbol: string;
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
  }
}
