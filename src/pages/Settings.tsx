import { usePortfolioStore } from "../store/portfolio";
import AlertManager from "../components/AlertManager";
import { toCSV, download } from "../utils/csv";
import { useAuthStore } from "../store/auth";

export default function Settings() {
  const { trades } = usePortfolioStore();
  const { user } = useAuthStore();

  const exportCSV = () => {
    const csv = toCSV(trades.map(t => ({
      time: t.time, side: t.side, coin: t.coin.toUpperCase(), qty: t.qty, price: t.price, usd: t.usd
    })), ["time","side","coin","qty","price","usd"]);
    download(`trades_${(user?.email||"user").replace(/[^a-z0-9]/gi,"_")}.csv`, csv);
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
        <div>
          <div className="font-medium">Export Trades</div>
          <div className="text-sm text-zinc-500">Download your trades as CSV</div>
        </div>
        <button onClick={exportCSV} className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">Export CSV</button>
      </div>

      <AlertManager />
    </section>
  );
}
