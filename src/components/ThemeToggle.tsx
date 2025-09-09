import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme_dark_v1");
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme_dark_v1", JSON.stringify(dark));
  }, [dark]);

  return (
    <button
      onClick={() => setDark(v => !v)}
      className="rounded-xl px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-700"
      title="Toggle theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
