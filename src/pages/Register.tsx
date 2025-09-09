import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuthStore();
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(email.trim(), password);
    if (!res.ok) alert(res.msg);
    else nav("/portfolio");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent"/>
      <button className="w-full px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">Register</button>
      <div className="text-sm text-center">
        Already have an account? <Link className="underline" to="/login">Login</Link>
      </div>
    </form>
  );
}
