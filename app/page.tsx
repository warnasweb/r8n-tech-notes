
"use client"

import { useMemo, useState } from "react"

import DockerFlow from "@/components/DockerFlow"
import Graph from "@/components/Graph"
import K8sCard from "@/components/K8sCard"
import RestFlow from "@/components/RestFlow"
import ThemeToggle from "@/components/ThemeToggle"
import { topics, type Topic } from "@/components/topics"

type Accent = Topic["accent"]

const accentTileIdleClass: Record<Accent, string> = {
  brand: "border-transparent bg-slate-100 text-slate-700 hover:text-brand-700 hover:bg-brand-50/80",
  sky: "border-transparent bg-slate-100 text-slate-700 hover:text-sky-700 hover:bg-sky-50/70",
  violet: "border-transparent bg-slate-100 text-slate-700 hover:text-violet-700 hover:bg-violet-50/70",
  teal: "border-transparent bg-slate-100 text-slate-700 hover:text-teal-700 hover:bg-teal-50/70",
}

const accentTileActiveClass: Record<Accent, string> = {
  brand: "border-brand-500 bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg",
  sky: "border-sky-500 bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg",
  violet: "border-violet-500 bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg",
  teal: "border-teal-500 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg",
}

const accentTileFocusClass: Record<Accent, string> = {
  brand: "focus-visible:ring-brand-400",
  sky: "focus-visible:ring-sky-400",
  violet: "focus-visible:ring-violet-400",
  teal: "focus-visible:ring-teal-400",
}

const accentIconIdleClass: Record<Accent, string> = {
  brand: "bg-white text-brand-600",
  sky: "bg-white text-sky-600",
  violet: "bg-white text-violet-600",
  teal: "bg-white text-teal-600",
}

const accentIconActiveClass: Record<Accent, string> = {
  brand: "bg-white/15 text-white",
  sky: "bg-white/15 text-white",
  violet: "bg-white/15 text-white",
  teal: "bg-white/15 text-white",
}

const accentPillClass: Record<Accent, string> = {
  brand: "border-brand-200 bg-brand-50 text-brand-700",
  sky: "border-sky-200 bg-sky-50 text-sky-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  teal: "border-teal-200 bg-teal-50 text-teal-700",
}

const accentHeadingClass: Record<Accent, string> = {
  brand: "text-brand-700",
  sky: "text-sky-700",
  violet: "text-violet-700",
  teal: "text-teal-700",
}

export default function Page() {
  const [activeTopicId, setActiveTopicId] = useState<Topic["id"]>("docker")

  const activeTopic = useMemo(() => {
    return topics.find((topic) => topic.id === activeTopicId) ?? topics[0]
  }, [activeTopicId])

  return (
    <main className="relative z-10">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${accentPillClass[activeTopic.accent]}`}
            >
              {activeTopic.label}
            </span>
            <h1 className={`mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl ${accentHeadingClass[activeTopic.accent]}`}>
              {activeTopic.heroTitle}
            </h1>
            <p className="mt-3 max-w-6xl text-slate-600">
              {activeTopic.heroDescription}
            </p>
          </div>
          <div className="flex items-end justify-end">
            <ThemeToggle />
          </div>
        </header>

        <div className="mb-10">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {topics.map((topic) => {
              const isActive = topic.id === activeTopic.id
              const accent = topic.accent
              const iconSurface = isActive
                ? accentIconActiveClass[accent]
                : accentIconIdleClass[accent]

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`group relative flex h-full flex-col items-center gap-4 rounded-2xl border px-6 py-6 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accentTileFocusClass[accent]} ${isActive ? accentTileActiveClass[accent] : accentTileIdleClass[accent]}`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border border-transparent transition ${iconSurface}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                      <path d={topic.tileIcon} />
                    </svg>
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm font-semibold uppercase tracking-wide ${isActive ? "text-white" : "text-slate-800"}`}>
                      {topic.label}
                    </span>
                    <span className={`text-xs leading-relaxed ${isActive ? "text-white/80" : "text-slate-500"}`}>
                      {topic.summary}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {activeTopic.id === "docker" && (
          <div className="mb-10">
            <DockerFlow />
          </div>
        )}

        {activeTopic.id === "rest" && (
          <div className="mb-10">
            <RestFlow />
          </div>
        )}

        {activeTopic.id === "kubernetes" && activeTopic.showGraph && (
          <div className="mb-10">
            <Graph />
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeTopic.items.map((item) => (
            <K8sCard
              key={item.key}
              title={item.title}
              blurb={item.blurb}
              iconPath={item.icon}
              details={item.details}
              snippet={item.snippet}
              accent={activeTopic.accent}
            />
          ))}
        </div>

        <footer className="mt-12 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} R5W Tech - Interactive Infographics.
        </footer>
      </section>
    </main>
  )
}
