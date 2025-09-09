type CB = (price: number) => void;

export function subscribeBinanceTrade(symbol: string, cb: CB): () => void {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
  ws.onmessage = (ev) => {
    try {
      const msg = JSON.parse(ev.data);
      if (msg && msg.p) cb(parseFloat(msg.p));
    } catch {}
  };
  const cleanup = () => ws.close();
  return cleanup;
}
