import { usePortfolioStore } from "../store/portfolio";
import { fmtNum, fmtUSD, shortTime } from "../utils/format";
import { COINS } from "../utils/coins";

export default function TradesTable({ limit = 10 }: { limit?: number }) {
  const { trades } = usePortfolioStore();
  const rows = trades.slice(0, limit);
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="p-3 text-left">Time</th>
            <th className="p-3">Side</th>
            <th className="p-3">Coin</th>
            <th className="p-3 text-right">Qty</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">USD</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={6} className="p-6 text-center text-zinc-500">No trades yet</td></tr>
          ) : rows.map(r => (
            <tr key={r.id} className="border-t border-zinc-200 dark:border-zinc-800">
              <td className="p-3">{shortTime(r.time)}</td>
              <td className={`p-3 font-medium ${r.side === "BUY" ? "text-emerald-600" : "text-rose-600"}`}>{r.side}</td>
              <td className="p-3">{COINS[r.coin].symbol}</td>
              <td className="p-3 text-right">{fmtNum(r.qty)}</td>
              <td className="p-3 text-right">{fmtUSD(r.price)}</td>
              <td className="p-3 text-right">{fmtUSD(r.usd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
