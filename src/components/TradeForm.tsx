import { useEffect, useMemo, useState } from "react";
import { CoinKey, COINS, COIN_LIST } from "../utils/coins";
import { usePriceStore } from "../store/prices";
import { usePortfolioStore } from "../store/portfolio";
import { fmtNum, fmtUSD } from "../utils/format";
import { subscribeBinanceTrade } from "../utils/binance";

export default function TradeForm() {
  const { prices } = usePriceStore();
  const { buy, sell, holdings, cashUSD } = usePortfolioStore();

  const [coin, setCoin] = useState<CoinKey>("btc");
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [qty, setQty] = useState<string>("");

  const cgPrice = prices[coin]?.price ?? 0;
  const [rtPrice, setRtPrice] = useState<number | null>(null);
  const price = rtPrice ?? cgPrice;

  useEffect(() => {
    // realtime bonus via binance if available
    const sym = `${COINS[coin].symbol.toLowerCase()}usdt`;
    const stop = subscribeBinanceTrade(sym, (p) => setRtPrice(p));
    return () => stop();
  }, [coin]);

  const usd = useMemo(() => {
    const q = parseFloat(qty || "0");
    return Number.isFinite(q) ? q * price : 0;
  }, [qty, price]);

  const onMax = () => {
    if (side === "BUY") setQty(((cashUSD / price) || 0).toString());
    else setQty(((holdings[coin] || 0) || 0).toString());
  };

  const submit = () => {
    const q = parseFloat(qty || "0");
    if (!q || q <= 0 || !Number.isFinite(q)) return;
    const px = price;
    const res = side === "BUY" ? buy(coin, q, px) : sell(coin, q, px);
    if (!res.ok) alert(res.msg);
    else setQty("");
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">Cash: <span className="font-medium">{fmtUSD(cashUSD)}</span></div>
        <div className="text-sm text-zinc-500">You have {fmtNum(holdings[coin] || 0)} {COINS[coin].symbol}</div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Coin</label>
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value as CoinKey)}
            className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"
          >
            {COIN_LIST.map(c => <option key={c.key} value={c.key}>{c.symbol} — {c.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Side</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSide("BUY")}
              className={`px-3 py-2 rounded-xl border ${side==="BUY" ? "border-emerald-500 bg-emerald-500/10" : "border-zinc-300 dark:border-zinc-700"}`}
            >Buy</button>
            <button
              onClick={() => setSide("SELL")}
              className={`px-3 py-2 rounded-xl border ${side==="SELL" ? "border-rose-500 bg-rose-500/10" : "border-zinc-300 dark:border-zinc-700"}`}
            >Sell</button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Qty ({COINS[coin].symbol})</label>
          <div className="flex gap-2">
            <input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="0.00"
              className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
            <button onClick={onMax} className="px-3 rounded-xl border border-zinc-300 dark:border-zinc-700">Max</button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>Price: <span className="font-medium">{price ? fmtUSD(price) : "—"}</span> {rtPrice ? <span className="text-xs text-emerald-600">(live)</span> : null}</div>
        <div>Est. {side === "BUY" ? "Cost" : "Proceeds"}: <span className="font-medium">{fmtUSD(usd)}</span></div>
      </div>

      <button
        onClick={submit}
        className={`mt-2 px-4 py-3 rounded-2xl text-white ${side==="BUY" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
      >
        {side} {COINS[coin].symbol}
      </button>
    </div>
  );
}
