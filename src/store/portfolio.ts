import { create } from "zustand";
import { CoinKey } from "../utils/coins";

export type Trade = {
  id: string;
  time: string;
  side: "BUY" | "SELL";
  coin: CoinKey;
  price: number;
  qty: number;     
  usd: number;   
};

type Portfolio = {
  cashUSD: number;
  holdings: Partial<Record<CoinKey, number>>;
  trades: Trade[]; 
};

type PortState = Portfolio & {
  hydrate: (email: string) => void;
  reset: () => void;
  buy: (coin: CoinKey, qty: number, price: number) => { ok: boolean; msg?: string };
  sell: (coin: CoinKey, qty: number, price: number) => { ok: boolean; msg?: string };
  valueUSD: (priceMap: Partial<Record<CoinKey, { price: number }>>) => number;
};

const START_CASH = 10_000;
const key = (email: string) => `cpt_portfolio_${email}`;

export const usePortfolioStore = create<PortState>((set, get) => ({
  cashUSD: START_CASH,
  holdings: {},
  trades: [],

  hydrate: (email) => {
    const raw = localStorage.getItem(key(email));
    if (!raw) {
      const base: Portfolio = { cashUSD: START_CASH, holdings: {}, trades: [] };
      localStorage.setItem(key(email), JSON.stringify(base));
      set(base);
      return;
    }
    try {
      const val = JSON.parse(raw) as Portfolio;
      set(val);
    } catch {
      set({ cashUSD: START_CASH, holdings: {}, trades: [] });
    }
  },

  reset: () => {
    set({ cashUSD: START_CASH, holdings: {}, trades: [] });
  },

  buy: (coin, qty, price) => {
    const { cashUSD, holdings, trades } = get();
    const cost = qty * price;
    if (cost > cashUSD + 1e-6) return { ok: false, msg: "Not enough USD" };
    const newHold = { ...holdings, [coin]: (holdings[coin] || 0) + qty };
    const trade: Trade = {
      id: crypto.randomUUID(),
      time: new Date().toISOString(),
      side: "BUY",
      coin,
      price,
      qty,
      usd: cost,
    };
    const next = { cashUSD: cashUSD - cost, holdings: newHold, trades: [trade, ...trades].slice(0, 1000) };
    set(next);
    persist(next);
    return { ok: true };
  },

  sell: (coin, qty, price) => {
    const { cashUSD, holdings, trades } = get();
    const have = holdings[coin] || 0;
    if (qty > have + 1e-9) return { ok: false, msg: "Not enough coins" };
    const newHold = { ...holdings, [coin]: have - qty };
    const proceeds = qty * price;
    const trade: Trade = {
      id: crypto.randomUUID(),
      time: new Date().toISOString(),
      side: "SELL",
      coin,
      price,
      qty,
      usd: proceeds,
    };
    const next = { cashUSD: cashUSD + proceeds, holdings: newHold, trades: [trade, ...trades].slice(0, 1000) };
    set(next);
    persist(next);
    return { ok: true };
  },

  valueUSD: (pm) => {
    const { holdings, cashUSD } = get();
    const coins = Object.entries(holdings).reduce((acc, [k, v]) => {
      const price = pm[k as CoinKey]?.price || 0;
      return acc + (v || 0) * price;
    }, 0);
    return cashUSD + coins;
  },
}));

function persist(p: Portfolio) {
  const authRaw = localStorage.getItem("cpt_auth_v1");
  if (!authRaw) return;
  const { email } = JSON.parse(authRaw);
  localStorage.setItem(key(email), JSON.stringify(p));
}
