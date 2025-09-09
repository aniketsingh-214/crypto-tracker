import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const nav = useNavigate();
  const loc = useLocation();
  const from = (loc.state as any)?.from || "/portfolio";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email.trim(), password);
    if (!res.ok) alert(res.msg);
    else nav(from, { replace: true });
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"/>
      <button className="w-full px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">Login</button>
      <div className="text-sm text-center">
        No account? <Link className="underline" to="/register">Register</Link>
      </div>
    </form>
  );
}
