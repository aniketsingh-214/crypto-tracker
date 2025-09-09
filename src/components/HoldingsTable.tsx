import { usePortfolioStore } from "../store/portfolio";
import { usePriceStore } from "../store/prices";
import { COINS } from "../utils/coins";
import { fmtNum, fmtUSD } from "../utils/format";

export default function HoldingsTable() {
  const { holdings, cashUSD } = usePortfolioStore();
  const { prices } = usePriceStore();

  const rows = Object.entries(COINS).map(([key, meta]) => {
    const qty = holdings[key as keyof typeof COINS] || 0;
    const price = prices[key as keyof typeof COINS]?.price ?? 0;
    const value = qty * price;
    return { symbol: meta.symbol, name: meta.name, qty, price, value };
  });

  const totalCoins = rows.reduce((a, r) => a + r.value, 0);
  const total = totalCoins + cashUSD;

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="p-3 text-left">Asset</th>
            <th className="p-3 text-right">Qty</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-zinc-200 dark:border-zinc-800">
            <td className="p-3 font-medium">USD</td>
            <td className="p-3 text-right">—</td>
            <td className="p-3 text-right">—</td>
            <td className="p-3 text-right">{fmtUSD(cashUSD)}</td>
          </tr>
          {rows.map((r) => (
            <tr key={r.symbol} className="border-t border-zinc-200 dark:border-zinc-800">
              <td className="p-3 font-medium">{r.symbol}</td>
              <td className="p-3 text-right">{fmtNum(r.qty)}</td>
              <td className="p-3 text-right">{fmtUSD(r.price)}</td>
              <td className="p-3 text-right">{fmtUSD(r.value)}</td>
            </tr>
          ))}
          <tr className="border-t border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-900/70">
            <td className="p-3 font-semibold">Total</td>
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3 text-right font-semibold">{fmtUSD(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
