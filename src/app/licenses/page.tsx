import Link from 'next/link'
import { ArrowRight, PackageOpen, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const notices = [
  { name: 'Next.js', license: 'MIT License', note: 'Application framework (Vercel).' },
  { name: 'React', license: 'MIT License', note: 'UI library (Meta).' },
  { name: 'Tailwind CSS', license: 'MIT License', note: 'Utility-first styling.' },
  { name: 'Lucide', license: 'ISC License', note: 'Icons used in the interface.' },
  { name: 'Radix UI', license: 'MIT License', note: 'Accessible primitives for dialogs, menus, and more.' },
  { name: 'TypeScript', license: 'Apache License 2.0', note: 'Typed JavaScript tooling.' },
]

export default function LicensesPage() {
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            Open source
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Licenses & acknowledgements</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {SITE_CONFIG.name} is built with community-maintained tools we are grateful for. This page lists major dependencies; full license text ships with each
            package in node_modules.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700">
              <PackageOpen className="h-6 w-6" />
            </div>
            <p className="text-sm leading-7 text-slate-600">
              Trademarks belong to their owners. If you believe attribution is missing or incorrect, please reach out—we will correct it quickly.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-violet-100/90 rounded-2xl border border-violet-100/80 bg-white/85 shadow-sm">
            {notices.map((n) => (
              <li key={n.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{n.name}</p>
                  <p className="text-sm text-slate-600">{n.note}</p>
                </div>
                <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800">{n.license}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-fuchsia-100/80 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/60 p-6">
            <p className="text-sm text-slate-700">Need a formal notice for compliance or procurement?</p>
            <Link href="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Contact the team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageShell>
  )
}
