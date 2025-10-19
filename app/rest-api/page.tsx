import type { ReactNode } from "react"
import {
  ArrowDown,
  ArrowRight,
  GitBranch,
  Layers,
  ListChecks,
  Network,
  PackageCheck,
  ServerCog,
  SquareStack,
} from "lucide-react"

type Tip = {
  id: number
  title: string
  lead: string
  accent: string
  headerColor: string
  iconClass: string
  icon: ReactNode
  content: ReactNode
}

const tips: Tip[] = [
  {
    id: 1,
    title: "Domain Model Driven",
    lead: "Let resource relationships shape your URLs.",
    accent: "bg-sky-50 border-sky-200",
    headerColor: "text-sky-700",
    iconClass: "text-sky-600 bg-sky-100",
    icon: <WorkflowIcon />,
    content: (
      <div className="grid gap-3 text-sm text-slate-600">
        <p>Expose top-level resources, then nest collections that belong to them.</p>
        <div className="grid gap-3 rounded-xl border border-sky-200 bg-white p-3 text-xs text-slate-500 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sky-700">Item</span>
            <ArrowBadge direction="right" />
            <span className="font-semibold text-emerald-600">Order</span>
            <span className="rounded-md border border-dashed border-sky-300 px-2 py-0.5 text-sky-600">
              /orders/{`{id}`}/items
            </span>
          </div>
          <p>Keep diagrams handy to validate the flow between aggregates.</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Choose HTTP Methods",
    lead: "Standard verbs communicate intent.",
    accent: "bg-emerald-50 border-emerald-200",
    headerColor: "text-emerald-700",
    iconClass: "text-emerald-600 bg-emerald-100",
    icon: <ListChecks className="h-6 w-6" />,
    content: (
      <table className="w-full text-left text-xs text-slate-600">
        <thead className="text-slate-500">
          <tr>
            <th className="py-1 font-semibold">Verb</th>
            <th className="py-1 font-semibold">Use for</th>
            <th className="py-1 font-semibold text-center">Guidance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100">
          <Row verb="GET" note="Reading data" status="good" />
          <Row verb="POST" note="Creating resources" status="good" />
          <Row verb="PUT" note="Full updates" status="okay" />
          <Row verb="PATCH" note="Partial updates" status="okay" />
          <Row verb="DELETE" note="Removing resources" status="good" />
        </tbody>
      </table>
    ),
  },
  {
    id: 3,
    title: "Implement Idempotence",
    lead: "Repeatable calls should not surprise clients.",
    accent: "bg-rose-50 border-rose-200",
    headerColor: "text-rose-700",
    iconClass: "text-rose-600 bg-rose-100",
    icon: <ServerCog className="h-6 w-6" />,
    content: (
      <div className="grid gap-2 text-xs text-slate-600">
        <p>Design non-mutating verbs to be naturally idempotent.</p>
        <div className="grid gap-2 md:grid-cols-2">
          <Hint verb="GET" hint="Safe by default." tone="positive" />
          <Hint verb="POST" hint="Use idempotency keys when needed." tone="caution" />
          <Hint verb="PUT" hint="Replace the resource fully." tone="neutral" />
          <Hint verb="DELETE" hint="Multiple deletes should be no-op." tone="neutral" />
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Choose HTTP Status Codes",
    lead: "Signal both success paths and failure modes.",
    accent: "bg-lime-50 border-lime-200",
    headerColor: "text-lime-700",
    iconClass: "text-lime-600 bg-lime-100",
    icon: <PackageCheck className="h-6 w-6" />,
    content: (
      <div className="grid gap-3 text-xs text-slate-600 md:grid-cols-2">
        <Status code="201" label="Created" tone="positive" />
        <Status code="400" label="Validation failed" tone="warn" />
        <Status code="401" label="Authentication needed" tone="warn" />
        <Status code="403" label="Permission denied" tone="warn" />
        <Status code="404" label="Resource not found" tone="warn" />
        <Status code="409" label="Conflict / concurrency" tone="warn" />
        <Status code="500" label="Server error" tone="error" />
        <Status code="503" label="Service unavailable" tone="error" />
      </div>
    ),
  },
  {
    id: 5,
    title: "Versioning",
    lead: "Pick one strategy and stay consistent.",
    accent: "bg-amber-50 border-amber-200",
    headerColor: "text-amber-700",
    iconClass: "text-amber-600 bg-amber-100",
    icon: <GitBranch className="h-6 w-6" />,
    content: (
      <div className="grid gap-2 text-xs text-slate-600">
        <Strategy label="Path (recommended)" example="GET /v1/users" />
        <Strategy label="Query param" example="GET /users?v=1" />
        <Strategy label="Header" example="GET /users - Header: Version v1" />
      </div>
    ),
  },
  {
    id: 6,
    title: "Semantic Paths",
    lead: "Let nouns and verbs tell a clear story.",
    accent: "bg-fuchsia-50 border-fuchsia-200",
    headerColor: "text-fuchsia-700",
    iconClass: "text-fuchsia-600 bg-fuchsia-100",
    icon: <Network className="h-6 w-6" />,
    content: (
      <div className="grid gap-2 text-xs text-slate-600">
        <Callout good text="POST /v1/users/login" />
        <Callout good text="POST /v1/orders/{id}/items" />
        <Callout text="POST /v1/authorizes" />
        <Callout text="GET /v1/orders/dj/items" />
        <p className="mt-2 text-slate-500">Use consistent singular/plural naming and avoid verbs in resource names.</p>
      </div>
    ),
  },
  {
    id: 7,
    title: "Batch Processing",
    lead: "Support both single and bulk workflows.",
    accent: "bg-indigo-50 border-indigo-200",
    headerColor: "text-indigo-700",
    iconClass: "text-indigo-600 bg-indigo-100",
    icon: <SquareStack className="h-6 w-6" />,
    content: (
      <div className="grid gap-2 text-xs text-slate-600">
        <div className="rounded-xl border border-indigo-200 bg-white p-3 shadow-inner">
          <p className="font-semibold text-indigo-700">Single transaction</p>
          <p>POST /v1/users → GET /v1/users/1</p>
        </div>
        <div className="rounded-xl border border-indigo-200 bg-white p-3 shadow-inner">
          <p className="font-semibold text-indigo-700">Batch endpoint</p>
          <p>POST /v1/users/batch → GET /v1/users?id=1,2,3</p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: "Query Language",
    lead: "Allow rich filtering while staying predictable.",
    accent: "bg-purple-50 border-purple-200",
    headerColor: "text-purple-700",
    iconClass: "text-purple-600 bg-purple-100",
    icon: <Layers className="h-6 w-6" />,
    content: (
      <div className="grid gap-2 text-xs text-slate-600">
        <QueryExample label="Pagination" example="GET /v1/users?page=1&size=20" />
        <QueryExample label="Sorting" example="GET /v1/users?sort=name.asc,age.desc" />
        <QueryExample
          label="Filtering"
          example="GET /v1/users?age-gte=21&os=ios&match=active"
        />
      </div>
    ),
  },
]

export default function RestApiPage() {
  return (
    <main className="relative z-10">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
                API Craft
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Top 8 Tips for RESTful API Design
              </h1>
              <p className="mt-3 max-w-3xl text-slate-600">
                A quick reference that captures domain-first thinking, consistent naming, and operational safeguards.
                Click any tile to drill into the details your team should align on.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((tip) => (
            <article
              key={tip.id}
              className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${tip.accent}`}
            >
              <header className="mb-4 flex items-center gap-3">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tip.iconClass}`}>{tip.icon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tip {tip.id.toString().padStart(2, "0")}
                  </p>
                  <h2 className={`text-lg font-semibold ${tip.headerColor}`}>{tip.title}</h2>
                  <p className="text-sm text-slate-600">{tip.lead}</p>
                </div>
              </header>
              {tip.content}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function Row({ verb, note, status }: { verb: string; note: string; status: "good" | "okay" | "warn" }) {
  const tone =
    status === "good"
      ? "text-emerald-600"
      : status === "okay"
      ? "text-amber-600"
      : "text-rose-600"
  const symbol = status === "good" ? "✔" : status === "okay" ? "△" : "!"
  return (
    <tr className="align-top">
      <td className="py-2 font-semibold text-slate-700">{verb}</td>
      <td className="py-2">{note}</td>
      <td className={`py-2 text-center font-semibold ${tone}`}>{symbol}</td>
    </tr>
  )
}

function Hint({ verb, hint, tone }: { verb: string; hint: string; tone: "positive" | "neutral" | "caution" }) {
  const classes =
    tone === "positive"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "neutral"
      ? "border-slate-200 bg-slate-50 text-slate-600"
      : "border-amber-200 bg-amber-50 text-amber-700"
  return (
    <div className={`flex items-start gap-2 rounded-xl border p-3 ${classes}`}>
      <span className="font-semibold">{verb}</span>
      <span>{hint}</span>
    </div>
  )
}

function Status({ code, label, tone }: { code: string; label: string; tone: "positive" | "warn" | "error" }) {
  const classes =
    tone === "positive"
      ? "border-lime-200 bg-white text-lime-700"
      : tone === "warn"
      ? "border-amber-200 bg-white text-amber-700"
      : "border-rose-200 bg-white text-rose-600"
  return (
    <div className={`rounded-xl border p-3 shadow-inner ${classes}`}>
      <p className="text-base font-semibold">{code}</p>
      <p>{label}</p>
    </div>
  )
}

function Strategy({ label, example }: { label: string; example: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-white px-3 py-2 shadow-inner">
      <span className="font-semibold text-amber-700">{label}</span>
      <span className="text-xs text-slate-600">{example}</span>
    </div>
  )
}

function Callout({ text, good }: { text: string; good?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 font-mono text-xs ${
        good ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-600"
      }`}
    >
      {text}
    </div>
  )
}

function QueryExample({ label, example }: { label: string; example: string }) {
  return (
    <div className="rounded-xl border border-purple-200 bg-white p-3 shadow-inner">
      <p className="font-semibold text-purple-700">{label}</p>
      <p className="font-mono text-xs text-slate-600">{example}</p>
    </div>
  )
}

function WorkflowIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 text-sky-600">
      <rect x="6" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="28" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 15h8M34 19v7M28 33h-6M20 30v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ArrowBadge({ direction }: { direction: "right" | "down" }) {
  return (
    <span className="mx-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
      {direction === "right" ? (
        <ArrowRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDown className="h-3.5 w-3.5" />
      )}
    </span>
  )
}
