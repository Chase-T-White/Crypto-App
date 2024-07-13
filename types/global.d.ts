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
  interface StorageCoins {
    betterId: string;
    id: string;
    name: string;
    symbol: string;
    image: string;
    number_of_coins: number;
    date_purchased: string;
    purchase_price_of_coin: number;
  }
  interface PortfolioCoins {
    betterId: string;
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null;
    last_updated: string;
    sparkline_in_7d: number[];
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    portfolio_coin_data: StorageCoins;
  }
  interface BannerMarketObject {
    [key: string]: number;
  }
  interface BannerData {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: BannerMarketObject;
    total_volume: BannerMarketObject;
    market_cap_percentage: BannerMarketObject;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  }
}
