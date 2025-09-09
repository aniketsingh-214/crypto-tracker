import TradeForm from "../components/TradeForm";
import TradesTable from "../components/TradesTable";

export default function Trade() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Trade</h1>
      <TradeForm />
      <div className="space-y-2">
        <h2 className="font-semibold">Recent Trades</h2>
        <TradesTable limit={10} />
      </div>
    </section>
  );
}
