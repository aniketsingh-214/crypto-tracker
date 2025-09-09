import { useEffect, useMemo } from "react";
import HoldingsTable from "../components/HoldingsTable";
import TradesTable from "../components/TradesTable";
import { usePortfolioStore } from "../store/portfolio";
import { useAuthStore } from "../store/auth";
import { usePriceStore } from "../store/prices";
import { fmtUSD } from "../utils/format";

export default function Portfolio() {
  const { user } = useAuthStore();
  const { hydrate, cashUSD, valueUSD } = usePortfolioStore();
  const { prices } = usePriceStore();

  useEffect(() => { if (user) hydrate(user.email); }, [user]);

  const pv = useMemo(() => valueUSD(prices), [prices, valueUSD]);

  const pnl = useMemo(() => ({
    abs: pv - 10_000,
    pct: (pv - 10_000) / 10_000,
  }), [pv]);

  return (
    <section className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Portfolio Value" value={fmtUSD(pv)} />
        <Card title="Cash (USD)" value={fmtUSD(cashUSD)} />
        <Card
          title="Profit / Loss"
          value={`${pnl.abs >= 0 ? "+" : ""}${fmtUSD(pnl.abs)} (${(pnl.pct*100).toFixed(2)}%)`}
          tone={pnl.abs >= 0 ? "pos" : "neg"}
        />
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Holdings</h2>
        <HoldingsTable />
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Last 10 Trades</h2>
        <TradesTable limit={10} />
      </div>
    </section>
  );
}

function Card({ title, value, tone }: { title: string; value: string; tone?: "pos"|"neg" }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="text-sm text-zinc-500">{title}</div>
      <div className={`text-2xl font-bold ${tone==="pos" ? "text-emerald-600" : tone==="neg" ? "text-rose-600" : ""}`}>{value}</div>
    </div>
  );
}
