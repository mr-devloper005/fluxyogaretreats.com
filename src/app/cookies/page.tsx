import Link from 'next/link'
import { ArrowRight, Cookie, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const blocks = [
  {
    title: 'Essential cookies',
    body:
      'Required for core functionality: keeping you signed in, protecting forms, and maintaining security. These cannot be switched off without breaking basic features.',
  },
  {
    title: 'Analytics',
    body:
      'Optional cookies help us understand which articles resonate, where pages feel slow, and how readers move through the journal. We use this to improve layout and performance—not to sell data.',
  },
  {
    title: 'Preferences',
    body:
      'Small tokens may remember choices such as theme or dismissal of banners. They make repeat visits smoother without asking the same questions each time.',
  },
  {
    title: 'Managing cookies',
    body:
      'You can control cookies through your browser settings. Blocking some categories may limit personalization or measurement features on the site.',
  },
]

export default function CookiesPage() {
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            Legal
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Cookie policy</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            How {SITE_CONFIG.name} uses cookies and similar technologies. Last updated: April 16, 2026.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700">
              <Cookie className="h-6 w-6" />
            </div>
            <p className="text-sm leading-7 text-slate-600">
              Cookies are one piece of how we run a calm, reliable reading experience. For broader data practices, see the{' '}
              <Link href="/privacy" className="font-semibold text-violet-700 underline-offset-4 hover:underline">
                Privacy policy
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {blocks.map((b) => (
              <div key={b.title} className="rounded-2xl border border-violet-100/80 bg-white/85 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">{b.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-fuchsia-100/80 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/60 p-6">
            <p className="text-sm text-slate-700">Questions about tracking or consent? We are happy to clarify.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageShell>
  )
}
