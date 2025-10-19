"use client"

import { motion } from "framer-motion"
import { useMemo, useState, type ReactNode } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"

import Modal from "@/components/Modal"
import { dockerConcepts } from "@/components/topics"

type StepMeta = {
  key: string
  title: string
  blurb: string
  highlights?: string[]
  icon: ReactNode
}

const iconClasses = "h-10 w-10 text-sky-600"

const steps: StepMeta[] = [
  {
    key: "dockerfile",
    title: "Dockerfile",
    blurb: "Declarative instructions to assemble application layers.",
    highlights: ["Base image", "Dependencies", "Entry point"],
    icon: (
      <svg viewBox="0 0 48 48" className={iconClasses}>
        <rect x="10" y="6" width="24" height="36" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M18 12h8M18 18h12M18 24h6M18 30h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 16l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "image",
    title: "Image",
    blurb: "Read-only snapshot built from the Dockerfile layers.",
    highlights: ["Immutable artifact", "Versioned tags", "Registry push"],
    icon: (
      <svg viewBox="0 0 48 48" className={iconClasses}>
        <rect x="10" y="10" width="28" height="4" rx="2" fill="currentColor" />
        <rect x="12" y="18" width="24" height="4" rx="2" fill="currentColor" />
        <rect x="14" y="26" width="20" height="4" rx="2" fill="currentColor" />
        <rect x="16" y="34" width="16" height="4" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "engine",
    title: "Docker Engine",
    blurb: "dockerd + containerd manage build, run, and orchestration APIs.",
    highlights: ["REST API", "BuildKit", "Container runtime"],
    icon: (
      <svg viewBox="0 0 48 48" className={iconClasses}>
        <circle cx="18" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M18 18v-8M18 30v8M12 24H4M24 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 16l6-4 8 14-6 4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="34" cy="22" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "container",
    title: "Container",
    blurb: "Runnable instance of the image with namespaces and cgroups.",
    highlights: ["Ephemeral", "Isolated FS", "Resource limits"],
    icon: (
      <svg viewBox="0 0 48 48" className={iconClasses}>
        <rect x="10" y="14" width="28" height="20" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 14v20M24 14v20M32 14v20" stroke="currentColor" strokeWidth="2" />
        <rect x="10" y="14" width="28" height="6" fill="currentColor" opacity="0.1" />
      </svg>
    ),
  },
  {
    key: "runtime",
    title: "Runtime",
    blurb: "Host kernel executes containers and keeps them portable.",
    highlights: ["runc", "Kernel features", "Observability hooks"],
    icon: (
      <svg viewBox="0 0 48 48" className={iconClasses}>
        <path d="M12 30h24l8 6H4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="8" y="16" width="32" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 20h6M14 24h10M30 22h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 16V8h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function DockerFlow() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const conceptLookup = useMemo(
    () =>
      dockerConcepts.reduce<Record<string, (typeof dockerConcepts)[number]>>(
        (acc, concept) => {
          acc[concept.key] = concept
          return acc
        },
        {}
      ),
    []
  )

  const selectedItem = useMemo(() => {
    if (!selectedKey) return undefined
    return dockerConcepts.find((item) => item.key === selectedKey)
  }, [selectedKey])

  return (
    <div className="card p-6">
      <h2 className="heading text-2xl font-bold text-center mb-6">How Docker Moves Workloads</h2>

      <div className="flex flex-col items-stretch gap-6">
        <div className="grid auto-rows-fr gap-6 md:grid-cols-5">
          {steps.map((step, index) => {
            const concept = conceptLookup[step.key]
            return (
              <div key={step.key} className="flex flex-col items-center text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedKey(step.key)}
                  className="flex h-full min-h-[220px] w-full flex-col items-center rounded-2xl border border-sky-200 bg-white px-4 py-4 shadow-sm transition hover:border-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-sky-200 bg-sky-50">
                    {step.icon}
                  </span>
                  <span className="mt-3 text-sm font-semibold text-sky-700">{step.title}</span>
                  <p className="mt-2 text-xs text-slate-600">{step.blurb}</p>
                  {step.highlights && (
                    <ul className="mt-3 space-y-1 text-xs text-slate-500">
                      {step.highlights.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  )}
                </motion.button>

                {index < steps.length - 1 && (
                  <div className="mt-6 flex items-center justify-center">
                    <ArrowDown className="h-10 w-10 text-slate-300 md:hidden" />
                    <ArrowRight className="hidden h-10 w-10 text-slate-300 md:block" />
                  </div>
                )}
                 {index === steps.length - 1 && (
                  <div className="mt-4 flex items-center justify-center">
                    <ArrowDown className="h-10 w-10 text-slate-300 md:hidden" />
                    <span className="hidden h-10 w-10 text-slate-300 md:block">&nbsp;</span>
                  </div>
                )}
                
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-500">
          Continuous loop: <strong>Build</strong> → <strong>Ship</strong> → <strong>Run</strong>
        </p>
      </div>

      <Modal
        open={!!selectedItem}
        onClose={() => setSelectedKey(null)}
        title={selectedItem?.title ?? ""}
      >
        {selectedItem && (
          <div>
            <p className="mb-3">{selectedItem.details || selectedItem.blurb}</p>
            {selectedItem.snippet && (
              <>
                <p className="mb-1 font-medium">Command example</p>
                <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs overflow-auto">
{selectedItem.snippet}
                </pre>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
