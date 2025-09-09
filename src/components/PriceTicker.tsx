import { usePriceStore } from "../store/prices";
import { COIN_LIST } from "../utils/coins";
import { fmtUSD, pct } from "../utils/format";

export default function PriceTicker() {
  const { prices } = usePriceStore();
  return (
    <div className="w-full overflow-x-auto border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-6 whitespace-nowrap text-sm">
        {COIN_LIST.map((c) => {
          const p = prices[c.key];
          const ch = p?.change24h ?? 0;
          return (
            <div key={c.key} className="flex items-center gap-2">
              <span className="font-medium">{c.symbol}</span>
              <span className="tabular-nums">{p ? fmtUSD(p.price) : "—"}</span>
              <span className={ch >= 0 ? "text-emerald-600" : "text-rose-600"}>{pct(ch)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
