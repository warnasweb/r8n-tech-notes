"use client"

import { useMemo, useState, type CSSProperties } from "react"
import {
  Cloud,
  CloudCog,
  Cloudy,
  Database,
  Layers,
  Monitor,
  Smartphone,
  Users,
} from "lucide-react"

import Modal from "@/components/Modal"

type RadialNode = {
  id: string
  title: string
  subtitle: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
  angle: number
  badge: string
}

const nodes: RadialNode[] = [
  {
    id: "mobile",
    title: "Mobile Applications",
    subtitle: "Native & hybrid clients",
    description:
      "Mobile apps rely on concise payloads, resilient offline support, and consistent versioning to keep experiences smooth across OS updates.",
    Icon: Smartphone,
    angle: -90,
    badge: "01",
  },
  {
    id: "web",
    title: "Web Applications",
    subtitle: "SPA / server rendered",
    description:
      "Web front-ends demand predictable pagination, CORS headers, and caching semantics to maintain snappy UX and SEO-friendly responses.",
    Icon: Monitor,
    angle: -135,
    badge: "02",
  },
  {
    id: "legacy",
    title: "Legacy Applications",
    subtitle: "Mainframe / SOAP bridges",
    description:
      "Older systems often adapt via gateways. Idempotent resource design and thorough error mapping help them coexist with REST endpoints.",
    Icon: Layers,
    angle: 180,
    badge: "03",
  },
  {
    id: "servers",
    title: "Application Servers",
    subtitle: "Microservices & workers",
    description:
      "Internal services consume APIs for orchestration. They need strong auth, tracing IDs, and rate limits to keep distributed workloads healthy.",
    Icon: CloudCog,
    angle: 135,
    badge: "04",
  },
  {
    id: "cloud-services",
    title: "Cloud-Based Services",
    subtitle: "SaaS integrations",
    description:
      "External platforms interact via webhooks and APIs. Clear contracts, OAuth flows, and change logs keep the ecosystem reliable.",
    Icon: Cloud,
    angle: 90,
    badge: "05",
  },
  {
    id: "partners",
    title: "Partner Applications",
    subtitle: "B2B ecosystems",
    description:
      "Partners require stable SLAs, sandbox environments, and versioning strategies to embed your API into their own customer journeys.",
    Icon: Users,
    angle: 45,
    badge: "06",
  },
  {
    id: "resources",
    title: "Cloud Resources",
    subtitle: "Storage / queues",
    description:
      "Service accounts and automation tasks call APIs to manage infrastructure. Fine-grained scopes and audit logs are essential.",
    Icon: Cloudy,
    angle: 0,
    badge: "07",
  },
  {
    id: "data",
    title: "Data Platforms",
    subtitle: "Lakes & analytics",
    description:
      "ETL pipelines ingest data via REST to power analytics. Bulk endpoints, consistent schemas, and metadata help prevent breakage.",
    Icon: Database,
    angle: -45,
    badge: "08",
  },
]

const RADIUS_VAR = "--rest-radius"
const CONNECTOR_VAR = "--rest-connector-length"

export default function RestFlow() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const nodeLookup = useMemo(
    () =>
      nodes.reduce<Record<string, RadialNode>>((acc, node) => {
        acc[node.id] = node
        return acc
      }, {}),
    []
  )

  const selected = selectedNode ? nodeLookup[selectedNode] : undefined

  return (
    <div className="card p-6">
      <h2 className="heading text-center text-2xl font-bold text-teal-700">REST API Consumers</h2>
      <p className="text-center text-sm text-slate-500">
        A REST layer often serves many touchpoints. Use this map to ensure each consumer has the
        reliability, metadata, and lifecycle support it needs.
      </p>

      <div className="mt-8 hidden md:block">
        <div
          className="relative mx-auto aspect-square max-w-3xl"
          style={
            {
              [RADIUS_VAR]: "min(40vw, 170px)",
              [CONNECTOR_VAR]: "calc(var(--rest-radius) - 60px)",
            } as CSSProperties
          }
        >
          <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-teal-100 bg-white shadow-inner" />
          <div className="absolute left-1/2 top-1/2 grid h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-xl">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em]">REST</p>
              <p className="text-3xl font-bold">API</p>
            </div>
          </div>

          {nodes.map((node) => {
            const { Icon, angle, badge } = node
            const rotate = angle
            const nodeTransform = `translate(-50%, -50%) rotate(${rotate}deg) translateY(calc(-1 * var(${RADIUS_VAR}))) rotate(${-rotate}deg)`
            const connectorTransform = `translate(-50%, -50%) rotate(${rotate}deg)`
            return (
              <div key={node.id}>
                <span
                  className="absolute origin-center bg-teal-200"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: "2px",
                    height: `var(${CONNECTOR_VAR})`,
                    transform: `translate(-50%, 0) rotate(${rotate}deg)`,
                    transformOrigin: "top center",
                  }}
                />
                <button
                  onClick={() => setSelectedNode(node.id)}
                  className="group absolute flex w-40 flex-col items-center rounded-2xl border border-teal-200 bg-white px-4 py-3 text-center shadow-md transition hover:border-teal-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-95"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: nodeTransform,
                    transformOrigin: "center",
                  }}
                >
                  <span className="mb-2 inline-flex h-7 items-center justify-center rounded-full bg-teal-100 px-3 text-[11px] font-semibold text-teal-600">
                    {badge}
                  </span>
                  <span className="mb-2 grid h-12 w-12 place-items-center rounded-full bg-teal-50 text-teal-600 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-sm font-semibold text-slate-800">{node.title}</p>
                  <p className="text-xs text-slate-500">{node.subtitle}</p>
                </button>
             </div>
           )
         })}
       </div>
      </div>

      <div className="mt-6 grid gap-3 md:hidden">
        {nodes.map((node) => {
          const { Icon } = node
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className="flex items-center gap-4 rounded-2xl border border-teal-200 bg-white p-4 shadow-sm transition active:scale-95"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-50 text-teal-600">
                <Icon className="h-6 w-6" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-500">
                  {node.badge}
                </p>
                <p className="text-sm font-semibold text-slate-800">{node.title}</p>
                <p className="text-xs text-slate-500">{node.subtitle}</p>
              </div>
            </button>
         )
       })}
     </div>

      <Modal open={!!selected} onClose={() => setSelectedNode(null)} title={selected?.title ?? ""}>
        {selected && (
          <div>
            <p className="mb-3 text-sm text-slate-600">{selected.description}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
