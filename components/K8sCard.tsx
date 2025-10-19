"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Modal from "@/components/Modal"
import type { Accent } from "@/components/topics"

export default function K8sCard({
  title,
  blurb,
  iconPath,
  details,
  snippet,
  href,
  accent = "brand",
}: {
  title: string
  blurb: string
  iconPath: string
  details?: string
  snippet?: string
  href?: string
  accent?: Accent
}) {
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)

  const accentRingClass: Record<Accent, string> = {
    brand: "focus:ring-brand-200",
    sky: "focus:ring-sky-200",
    violet: "focus:ring-violet-200",
    teal: "focus:ring-teal-200",
  }

  const accentSideBarClass: Record<Accent, string> = {
    brand: "before:bg-brand-500",
    sky: "before:bg-sky-500",
    violet: "before:bg-violet-500",
    teal: "before:bg-teal-500",
  }

  const accentIconSurface: Record<Accent, string> = {
    brand: "border-brand-100 bg-brand-50",
    sky: "border-sky-100 bg-sky-50",
    violet: "border-violet-100 bg-violet-50",
    teal: "border-teal-100 bg-teal-50",
  }

  const accentIconFill: Record<Accent, string> = {
    brand: "fill-brand-700",
    sky: "fill-sky-700",
    violet: "fill-violet-700",
    teal: "fill-teal-700",
  }

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`relative group overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 pl-6 text-left shadow-sm focus:outline-none focus:ring-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-[''] dark:border-slate-700 dark:bg-slate-900 ${accentRingClass[accent]} ${accentSideBarClass[accent]}`}
    >
      <button onClick={() => setOpen(v => !v)} className="w-full text-left">
        <div className="flex items-center gap-4">
          <div className={`grid place-items-center h-12 w-12 rounded-xl border ${accentIconSurface[accent]}`}>
            <svg viewBox="0 0 24 24" className={`h-7 w-7 ${accentIconFill[accent]}`}>
              <path d={iconPath} />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{blurb}</p>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              <p>
                <span className="font-medium">More:</span> {title} is a key part of this stack.
                Tap cards to open or close. Click "Deep dive" for details and a quick example.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex gap-2">
        <button onClick={() => setModal(true)} className="chip">
          Deep dive
        </button>
        {href && (
          <Link className="chip" href={href}>
            Open page
          </Link>
        )}
      </div>

      {/* Modal content */}
      <Modal open={modal} onClose={() => setModal(false)} title={title}>
        {details && <p className="mb-3">{details}</p>}
        {snippet && (
          <div>
            <p className="mb-1 font-medium">Quick example</p>
            <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs overflow-auto">
{snippet}
            </pre>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
