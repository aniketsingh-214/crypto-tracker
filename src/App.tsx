import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portfolio from "./pages/Portfolio";
import Trade from "./pages/Trade";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import { usePriceStore } from "./store/prices";
import { useAlertStore } from "./store/alerts";
import { checkAlerts } from "./store/alerts";
import "./serviceWorkerRegistration";

export default function App() {
  const { hydrateFromStorage } = useAuthStore();
  const { startAutoRefresh, stopAutoRefresh, lastUpdated, prices } = usePriceStore();
  const { alerts } = useAlertStore();
  const location = useLocation();

  useEffect(() => {
    hydrateFromStorage();
    startAutoRefresh();
    return () => stopAutoRefresh();
  }, []);

  useEffect(() => {
    if (Object.keys(prices).length) checkAlerts(prices);
  }, [prices, alerts]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors">
      <Navbar lastUpdated={lastUpdated} />
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Gate element={<Login />} />} />
          <Route path="/register" element={<Gate element={<Register />} />} />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trade"
            element={
              <ProtectedRoute>
                <Trade />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="text-center text-xs text-zinc-500 py-8">
        Built for demo — prices from CoinGecko. Practice only.
      </footer>
    </div>
  );
}

function Gate({ element }: { element: JSX.Element }) {
  const { user } = useAuthStore();
  const location = useLocation();
  if (user) return <Navigate to={(location.state as any)?.from ?? "/portfolio"} replace />;
  return element;
}
