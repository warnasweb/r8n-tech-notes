
"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const PORTAL_ID = "modal-root"

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof document === "undefined") return

    let portalHost = document.getElementById(PORTAL_ID)
    if (!portalHost) {
      portalHost = document.createElement("div")
      portalHost.setAttribute("id", PORTAL_ID)
      document.body.appendChild(portalHost)
    }

    const portalEl = document.createElement("div")
    portalHost.appendChild(portalEl)
    portalRef.current = portalEl
    setMounted(true)

    return () => {
      if (portalRef.current && portalHost) {
        portalHost.removeChild(portalRef.current)
        portalRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    requestAnimationFrame(() => dialog.focus({ preventScroll: true }))
  }, [open])

  if (!open) return null
  if (!mounted || !portalRef.current) return null

  const modalUi = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="card relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <h3 className="text-lg font-semibold heading">{title}</h3>
          <button onClick={onClose} className="chip">
            Close
          </button>
        </div>
        <div className="max-h-[78vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalUi, portalRef.current)
}
