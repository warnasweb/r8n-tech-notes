
"use client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Initialize from system preference on first load
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const initial = mq.matches
      setDark(initial)
      document.documentElement.classList.toggle("dark", initial)
    }
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
  }

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 shadow-sm hover:shadow transition"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {dark ? "Dark" : "Light"} mode
    </button>
  )
}
