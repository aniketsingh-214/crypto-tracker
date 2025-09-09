export type CoinKey = "btc" | "eth" | "usdt" | "usdc" | "xmr" | "sol";

export const COINS: Record<CoinKey, { id: string; symbol: string; name: string }> = {
  btc:  { id: "bitcoin",   symbol: "BTC",  name: "Bitcoin" },
  eth:  { id: "ethereum",  symbol: "ETH",  name: "Ethereum" },
  usdt: { id: "tether",    symbol: "USDT", name: "Tether" },
  usdc: { id: "usd-coin",  symbol: "USDC", name: "USD Coin" },
  xmr:  { id: "monero",    symbol: "XMR",  name: "Monero" },
  sol:  { id: "solana",    symbol: "SOL",  name: "Solana" },
};

export const COIN_LIST = Object.entries(COINS).map(([k, v]) => ({ key: k as keyof typeof COINS, ...v }));
export const COINGECKO_IDS = COIN_LIST.map(c => c.id).join(",");
