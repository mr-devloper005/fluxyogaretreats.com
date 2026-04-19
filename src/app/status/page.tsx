import Link from 'next/link'
import { Activity, ArrowRight, CheckCircle2, Clock, Server, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const systems = [
  { name: 'Reading & articles', detail: 'Browsing, article pages, and embedded media.' },
  { name: 'Publishing', detail: 'Editor, drafts, and public updates to the journal.' },
  { name: 'Accounts', detail: 'Sign-in, sessions, and profile basics.' },
]

const timeline = [
  { date: 'April 8, 2026', title: 'Scheduled image optimization', note: 'Completed. Faster loads on long essays with galleries.', tone: 'resolved' as const },
  { date: 'March 19, 2026', title: 'Brief editor autosave delay', note: 'Resolved. Autosave queue caught up within 20 minutes.', tone: 'resolved' as const },
  { date: 'March 2, 2026', title: 'Email delivery lag', note: 'Resolved. Transactional messages returned to normal the same day.', tone: 'resolved' as const },
]

export default function StatusPage() {
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            System status
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3rem] lg:leading-[1.08]">
            All systems calm for{' '}
            <span className="text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text">{SITE_CONFIG.name}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            A simple health board for readers and contributors. When something degrades, we post it here first—then follow up by email when it is fully closed.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            No active incidents
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {systems.map((s) => (
            <div
              key={s.name}
              className="rounded-[1.5rem] border border-white/70 bg-white/70 p-7 shadow-[0_20px_60px_rgba(168,85,247,0.1)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700">
                  <Server className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">Operational</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{s.name}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{s.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-violet-700">
              <Activity className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">Recent history</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">What changed lately</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Maintenance windows are posted in advance when they could interrupt publishing. If you saw something odd and it is not listed, tell us via the Help
              Center.
            </p>
            <ul className="mt-8 space-y-4">
              {timeline.map((row) => (
                <li key={row.title} className="flex gap-4 rounded-2xl border border-violet-100/80 bg-white/80 p-4 shadow-sm">
                  <div className="mt-0.5 text-violet-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{row.date}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{row.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{row.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-white/60 bg-gradient-to-b from-white/80 to-violet-50/50 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.08)] backdrop-blur-xl">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Subscribe to updates</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                We do not run a separate status RSS feed yet. For product changes and incidents that affect your account, watch your inbox or check back here after
                major releases.
              </p>
            </div>
            <Link
              href="/help"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(90deg,#a855f7,#ec4899)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(168,85,247,0.35)] transition hover:brightness-105"
            >
              Go to Help Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageShell>
  )
}
