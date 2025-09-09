import { create } from "zustand";
import { CoinKey } from "../utils/coins";

export type Alert = {
  id: string;
  coin: CoinKey;
  dir: "above" | "below";
  price: number;
  active: boolean;
};

type AlertState = {
  alerts: Alert[];
  add: (a: Omit<Alert, "id" | "active">) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  hydrate: () => void;
};

const KEY = "cpt_alerts_v1";

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [],
  hydrate: () => {
    try {
      const arr = JSON.parse(localStorage.getItem(KEY) || "[]") as Alert[];
      set({ alerts: arr });
    } catch {}
  },
  add: (a) => {
    const next = [{ id: crypto.randomUUID(), active: true, ...a }, ...get().alerts];
    set({ alerts: next });
    localStorage.setItem(KEY, JSON.stringify(next));
  },
  toggle: (id) => {
    const next = get().alerts.map(a => a.id === id ? { ...a, active: !a.active } : a);
    set({ alerts: next });
    localStorage.setItem(KEY, JSON.stringify(next));
  },
  remove: (id) => {
    const next = get().alerts.filter(a => a.id !== id);
    set({ alerts: next });
    localStorage.setItem(KEY, JSON.stringify(next));
  },
}));

export function checkAlerts(prices: Partial<Record<CoinKey, { price: number }>>) {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || "[]") as Alert[];
    let changed = false;
    arr.forEach(a => {
      if (!a.active) return;
      const p = prices[a.coin]?.price;
      if (!p) return;
      if ((a.dir === "above" && p >= a.price) || (a.dir === "below" && p <= a.price)) {
        changed = true;
        a.active = false;
        notify(`${a.coin.toUpperCase()} is ${a.dir} ${a.price}`);
      }
    });
    if (changed) localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

function notify(body: string) {
  if ("Notification" in window) {
    if (Notification.permission === "granted") new Notification(body);
    else if (Notification.permission !== "denied") Notification.requestPermission();
  }
}
