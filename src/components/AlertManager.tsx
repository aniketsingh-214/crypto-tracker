import { useEffect, useState } from "react";
import { useAlertStore } from "../store/alerts";
import { COIN_LIST, CoinKey } from "../utils/coins";

export default function AlertManager() {
  const { alerts, add, remove, toggle, hydrate } = useAlertStore();
  const [coin, setCoin] = useState<CoinKey>("btc");
  const [dir, setDir] = useState<"above"|"below">("above");
  const [price, setPrice] = useState<string>("");

  useEffect(() => { hydrate(); }, []);

  const submit = () => {
    const p = parseFloat(price || "0");
    if (!p) return;
    add({ coin, dir, price: p });
    setPrice("");
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
      <div className="font-semibold mb-3">Price Alerts</div>
      <div className="grid md:grid-cols-4 gap-2 mb-3">
        <select value={coin} onChange={e => setCoin(e.target.value as CoinKey)} className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent">
          {COIN_LIST.map(c => <option key={c.key} value={c.key}>{c.symbol}</option>)}
        </select>
        <select value={dir} onChange={e => setDir(e.target.value as any)} className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent">
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Target price" className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"/>
        <button onClick={submit} className="px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">Add</button>
      </div>

      <ul className="space-y-2">
        {alerts.map(a => (
          <li key={a.id} className="flex items-center justify-between gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2">
            <div className="text-sm">{a.coin.toUpperCase()} {a.dir} {a.price} — {a.active ? "active" : "done"}</div>
            <div className="flex gap-2">
              <button onClick={() => toggle(a.id)} className="text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700">{a.active ? "Disable" : "Enable"}</button>
              <button onClick={() => remove(a.id)} className="text-xs px-2 py-1 rounded-md border border-rose-300 text-rose-600 dark:border-rose-700">Remove</button>
            </div>
          </li>
        ))}
        {!alerts.length && <div className="text-sm text-zinc-500">No alerts yet.</div>}
      </ul>
    </div>
  );
}
