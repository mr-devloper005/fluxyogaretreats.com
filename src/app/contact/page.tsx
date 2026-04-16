import Link from 'next/link'
import { ArrowRight, FileText, Mail, MapPin, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: FileText,
    title: 'Editorial & submissions',
    body: 'Pitch essays, interviews, and retreat field notes. Tell us the headline idea, audience, and whether you have original photography.',
  },
  {
    icon: Mail,
    title: 'Newsletter & partnerships',
    body: 'Sponsorships, cross-promotions, and co-branded issues for studios and hosts who align with slow, ethical travel.',
  },
  {
    icon: MapPin,
    title: 'Hosts & local guides',
    body: 'Update factual details about a venue we have covered, or suggest a destination that deserves a thoughtful feature.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
              <Sparkles className="h-3.5 w-3.5" />
              Contact
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
              Talk to the desk behind{' '}
              <span className="text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text">{SITE_CONFIG.name}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We are a small team—journalists, editors, and producers who care about movement, stillness, and honest travel writing. Choose the lane that fits so we
              can reply with the right person.
            </p>
            <div className="mt-10 space-y-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-[1.5rem] border border-white/60 bg-white/55 p-6 shadow-[0_12px_40px_rgba(236,72,153,0.08)] backdrop-blur-md"
                >
                  <lane.icon className="h-5 w-5 text-violet-700" />
                  <h2 className="mt-3 text-lg font-semibold text-slate-900">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{lane.body}</p>
                </div>
              ))}
            </div>
            <Link href="/help" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Visit Help Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Send a message</h2>
            <p className="mt-2 text-sm text-slate-600">We read everything; please allow up to two business days for a thoughtful reply.</p>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-xl border border-slate-200/80 bg-white/85 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#a855f7]/40"
                placeholder="Your name"
                name="name"
                autoComplete="name"
              />
              <input
                className="h-12 rounded-xl border border-slate-200/80 bg-white/85 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#a855f7]/40"
                placeholder="Email address"
                name="email"
                type="email"
                autoComplete="email"
              />
              <input
                className="h-12 rounded-xl border border-slate-200/80 bg-white/85 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#a855f7]/40"
                placeholder="Topic (e.g. submission, partnership, correction)"
                name="topic"
              />
              <textarea
                className="min-h-[200px] rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#a855f7]/40"
                placeholder="Share context, links, deadlines, and the outcome you are hoping for."
                name="message"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#a855f7,#ec4899)] px-6 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(168,85,247,0.35)] transition hover:brightness-105"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditorialPageShell>
  )
}
