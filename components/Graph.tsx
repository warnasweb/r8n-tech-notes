"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { k8sItems } from "@/components/k8s-data"
import Modal from "@/components/Modal"
import { ArrowDown } from "lucide-react"

export default function Graph() {
  const [selected, setSelected] = useState<any>(null)

  const openModal = (key: string) => {
    const item = k8sItems.find((i) => i.key === key)
    if (item) setSelected(item)
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold heading mb-6 text-center">
        How Kubernetes Connects
      </h2>

      <div className="flex flex-col items-center space-y-6">

        {/* kubectl */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => openModal("kubectl")}
          className="px-6 py-3 rounded-xl bg-brand-100 dark:bg-brand-800 text-brand-900 dark:text-brand-50 font-semibold shadow-sm hover:shadow-md transition"
        >
          kubectl (Client CLI)
        </motion.button>

        <ArrowDown className="text-slate-500 dark:text-slate-400" />

        {/* API Server */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal("api")}
            className="px-6 py-3 rounded-xl bg-brand-200 dark:bg-brand-700 text-brand-900 dark:text-brand-50 font-semibold shadow-sm hover:shadow-md transition"
          >
            API Server
          </motion.button>
        </div>

        <ArrowDown className="text-slate-500 dark:text-slate-400" />

        {/* Control Plane */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { key: "sched", label: "Scheduler" },
            { key: "ctrl", label: "Controller Manager" },
            { key: "etcd", label: "etcd" },
          ].map((c) => (
            <motion.button
              key={c.key}
              whileHover={{ scale: 1.05 }}
              onClick={() => openModal(c.key)}
              className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium shadow-sm hover:shadow-md transition"
            >
              {c.label}
            </motion.button>
          ))}
        </div>

        <ArrowDown className="text-slate-500 dark:text-slate-400" />

        {/* Nodes + Kubelet */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal("node")}
            className="px-5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-50 font-semibold shadow-sm hover:shadow-md transition"
          >
            Node (Worker)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal("kubelet")}
            className="px-5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-50 font-medium shadow-sm hover:shadow-md transition"
          >
            Kubelet
          </motion.button>
        </div>

        <ArrowDown className="text-slate-500 dark:text-slate-400" />

        {/* Workloads */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { key: "pod", label: "Pods" },
            { key: "deploy", label: "Deployments" },
            { key: "ns", label: "Namespaces" },
          ].map((w) => (
            <motion.button
              key={w.key}
              whileHover={{ scale: 1.05 }}
              onClick={() => openModal(w.key)}
              className="px-5 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-50 font-medium shadow-sm hover:shadow-md transition"
            >
              {w.label}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="muted text-sm mt-6 text-center">
        Flow: <strong>kubectl</strong> → <strong>API Server</strong> → Control Plane (etcd, Scheduler, Controller) → <strong>Nodes</strong> → <strong>Pods</strong>.
      </p>

      {/* Modal popup */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || ""}
      >
        {selected && (
          <div>
            <p className="mb-3">{selected.details || selected.blurb}</p>
            {selected.snippet && (
              <>
                <p className="mb-1 font-medium">kubectl example</p>
                <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs overflow-auto">
{selected.snippet}
                </pre>
              </>
            )}
            {selected.yaml && (
              <>
                <p className="mb-1 mt-3 font-medium">YAML example</p>
                <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs overflow-auto">
{selected.yaml}
                </pre>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
