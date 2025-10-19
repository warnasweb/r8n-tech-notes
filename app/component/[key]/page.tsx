
  import { getItemByKey } from "@/components/k8s-data"
  import Link from "next/link"

  export default function ComponentPage({ params }: { params: { key: string } }) {
    const item = getItemByKey(params.key)
    if (!item) {
      return (
        <main className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-red-600">Component not found.</p>
          <Link className="underline" href="/">← Back</Link>
        </main>
      )
    }

    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold heading">{item.title}</h1>
          <Link className="chip" href="/">← Back</Link>
        </div>

        <section className="card p-5 mb-6">
          <h2 className="text-xl font-semibold heading mb-2">What it is</h2>
          <p className="muted">{item.blurb}</p>
          {item.details && <p className="muted mt-2">{item.details}</p>}
        </section>

        <section className="grid md:grid-cols-2 gap-5">
          <div className="card p-5">
            <h3 className="text-lg font-semibold heading mb-2">kubectl tips</h3>
            <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs overflow-auto whitespace-pre-wrap">
{item.snippet ?? "# No kubectl snippet for this component."}
            </pre>
          </div>
          <div className="card p-5">
            <h3 className="text-lg font-semibold heading mb-2">YAML example</h3>
            <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs overflow-auto whitespace-pre-wrap">
{item.yaml ?? "# This component is not typically defined via YAML."}
            </pre>
          </div>
        </section>
      </main>
    )
  }
