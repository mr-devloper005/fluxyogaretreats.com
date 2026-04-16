import Link from 'next/link'
import { ArrowRight, Heart, PenLine, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { mockTeamMembers } from '@/data/mock-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const highlights = [
  { label: 'Stories in the library', value: '180+' },
  { label: 'Readers each month', value: '48k' },
  { label: 'Retreat hosts featured', value: '32' },
]

const values = [
  {
    title: 'Written for planners and practitioners',
    description: 'We prioritize clarity for people who design itineraries, teach movement, and care how a week away actually feels on the ground.',
  },
  {
    title: 'Glass-quiet presentation',
    description: 'Layouts borrow from magazines—generous margins, soft glass panels, and color that supports reading instead of competing with it.',
  },
  {
    title: 'Rooted in retreat reality',
    description: 'Our editors work beside hosts and teachers so the advice in each article stays honest about trade-offs, costs, and energy.',
  },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#faf5ff_0%,#ffffff_38%,#fdf2f8_100%)] text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_320px_at_12%_-8%,rgba(168,85,247,0.18),transparent_58%),radial-gradient(480px_280px_at_92%_8%,rgba(236,72,153,0.12),transparent_55%)]"
        aria-hidden
      />
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            About {SITE_CONFIG.name}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
            A small editorial desk for <span className="text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text">mindful travel</span> and retreat life.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {SITE_CONFIG.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#a855f7,#ec4899)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(168,85,247,0.35)] transition hover:brightness-105"
            >
              Read the journal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-violet-200/80 hover:bg-white"
            >
              Contact us
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-7 py-3.5 text-sm font-semibold text-violet-800 transition hover:bg-violet-50/80"
            >
              Help Center
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-7 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-violet-700">
              <PenLine className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">Our story</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Why we publish slowly.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {SITE_CONFIG.name} exists so retreat-curious readers can go deeper than a brochure: movement science, host interviews, packing lists, and the
              quiet logistics that make a week away restorative instead of stressful.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-violet-100/80 bg-gradient-to-b from-white/90 to-violet-50/40 p-4 text-left shadow-sm">
                  <div className="text-2xl font-semibold text-slate-900">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-1 flex-col rounded-[1.5rem] border border-white/60 bg-white/55 p-6 shadow-[0_12px_40px_rgba(236,72,153,0.08)] backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700/80">People behind the bylines</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">Meet the team</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">Editors and contributors who split time between the desk and the mat.</p>
            </div>
            <Link href="/contact" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Work with us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-[1.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_60px_rgba(168,85,247,0.1)] backdrop-blur-xl transition hover:border-violet-200/80"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-violet-100">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <p className="mt-3 text-xs text-slate-500">{member.location}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
