import { create } from "zustand";

type User = { email: string };
type UsersDB = { email: string; password: string }[];

type AuthState = {
  user: User | null;
  hydrateFromStorage: () => void;
  register: (email: string, password: string) => { ok: boolean; msg?: string };
  login: (email: string, password: string) => { ok: boolean; msg?: string };
  logout: () => void;
};

const USERS_KEY = "cpt_users_v1";
const AUTH_KEY = "cpt_auth_v1";

function readUsers(): UsersDB {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
function writeUsers(db: UsersDB) { localStorage.setItem(USERS_KEY, JSON.stringify(db)); }

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  hydrateFromStorage: () => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return;
    try { set({ user: JSON.parse(raw) }); } catch {}
  },

  register: (email, password) => {
    const db = readUsers();
    if (db.find(u => u.email === email)) return { ok: false, msg: "Email already registered" };
    db.push({ email, password });
    writeUsers(db);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
    set({ user: { email } });
    return { ok: true };
  },

  login: (email, password) => {
    const db = readUsers();
    const hit = db.find(u => u.email === email && u.password === password);
    if (!hit) return { ok: false, msg: "Invalid credentials" };
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
    set({ user: { email } });
    return { ok: true };
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    set({ user: null });
  },
}));
