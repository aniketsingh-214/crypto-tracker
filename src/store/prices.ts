import { create } from "zustand";
import { COINGECKO_IDS, COINS, CoinKey } from "../utils/coins";

type PriceRow = {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type PriceMap = Partial<Record<CoinKey, { price: number; change24h: number }>>;

type PriceState = {
  prices: PriceMap;
  lastUpdated: string | null;
  loading: boolean;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
  fetchOnce: () => Promise<void>;
};

let timer: any;

async function fetchCoinGecko(): Promise<PriceMap> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINGECKO_IDS}`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error("Price fetch failed");
  const data = (await res.json()) as PriceRow[];
  const map: PriceMap = {};
  data.forEach((row) => {
    const entry = Object.entries(COINS).find(([, v]) => v.id === row.id);
    if (!entry) return;
    const [key] = entry as [CoinKey, any];
    map[key] = { price: row.current_price, change24h: row.price_change_percentage_24h / 100 };
  });
  return map;
}

export const usePriceStore = create<PriceState>((set, get) => ({
  prices: {},
  lastUpdated: null,
  loading: false,

  startAutoRefresh: () => {
    if (timer) return;
    get().fetchOnce();
    timer = setInterval(() => get().fetchOnce(), 30_000);
  },

  stopAutoRefresh: () => {
    if (timer) clearInterval(timer);
    timer = null;
  },

  fetchOnce: async () => {
    set({ loading: true });
    try {
      const prices = await fetchCoinGecko();
      set({ prices, lastUpdated: new Date().toISOString(), loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
