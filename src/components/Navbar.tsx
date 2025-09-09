import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import ThemeToggle from "./ThemeToggle";
import PriceTicker from "./PriceTicker";

export default function Navbar({ lastUpdated }: { lastUpdated: string | null }) {
  const { user, logout } = useAuthStore();
  const loc = useLocation();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold tracking-tight text-lg">CryptoTracker</Link>
          <nav className="hidden md:flex items-center gap-3">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/portfolio">Portfolio</NavItem>
            <NavItem to="/trade">Trade</NavItem>
            <NavItem to="/settings">Settings</NavItem>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-xs text-zinc-500">
            {lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : "Connecting..."}
          </div>
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">{user.email}</span>
              <button onClick={logout} className="px-3 py-1 rounded-xl text-sm bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm hover:underline">Login</Link>
              <Link to="/register" className="text-sm hover:underline">Register</Link>
            </div>
          )}
        </div>
      </div>
      <PriceTicker />
      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex gap-4 text-sm">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/portfolio">Portfolio</NavItem>
        <NavItem to="/trade">Trade</NavItem>
        <NavItem to="/settings">Settings</NavItem>
      </div>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`px-2 py-1 rounded-md ${active ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
    >
      {children}
    </Link>
  );
}
