import { Link } from "react-router-dom";
import TradesTable from "../components/TradesTable";
import { usePortfolioStore } from "../store/portfolio";
import { usePriceStore } from "../store/prices";
import { fmtUSD } from "../utils/format";

export default function Home() {
  const { valueUSD } = usePortfolioStore();
  const { prices, loading } = usePriceStore();

  const tv = valueUSD(prices);

  return (
    <section className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Crypto Portfolio Tracker</h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Live prices. $10,000 mock USD. Buy/Sell BTC, ETH, USDT, USDC, XMR, SOL. Learn market rhythm without losing sleep.
          </p>
          <div className="flex gap-3">
            <Link to="/portfolio" className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">View Portfolio</Link>
            <Link to="/trade" className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700">Trade Now</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="text-sm text-zinc-500">Estimated Portfolio Value</div>
          <div className="text-3xl font-bold">{fmtUSD(tv)}</div>
          <div className="text-xs text-zinc-500 mt-2">{loading ? "Updating…" : "Live via CoinGecko"}</div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Recent Trades</h2>
        <TradesTable />
      </div>
    </section>
  );
}
