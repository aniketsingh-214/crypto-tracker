export const fmtUSD = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const fmtNum = (n: number, d = 6) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });

export const pct = (n: number) =>
  `${(n >= 0 ? "+" : "")}${(n * 100).toFixed(2)}%`;

export const ts = () => new Date().toISOString();

export const shortTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", month: "short", day: "2-digit" });
