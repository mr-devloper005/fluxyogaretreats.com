import Link from 'next/link'
import { ArrowRight, BookOpen, LifeBuoy, Mail, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE_CONFIG } from '@/lib/site-config'

const guides = [
  {
    title: 'Start reading',
    description: 'Browse the journal by topic, save pieces for later, and share links that help friends plan a retreat with confidence.',
  },
  {
    title: 'Write with us',
    description: 'Use Write article to draft in the editor, add imagery where it helps, and publish when your piece feels ready—not when a template says so.',
  },
  {
    title: 'Account & email',
    description: 'Sign in to sync drafts, manage your profile, and receive occasional updates about features that affect publishing.',
  },
]

const faqs = [
  {
    id: 'faq-1',
    question: 'How do I submit a story or column?',
    answer:
      'Open Write article from the navigation when you are signed in. Draft in sections, preview on desktop and mobile, then publish. For partnership pitches, use Contact us and choose editorial in your message.',
  },
  {
    id: 'faq-2',
    question: 'Can I edit or unpublish something I posted?',
    answer:
      'Yes. Open your article from the library or dashboard flows you already use; you can update copy, swap imagery, or take a piece offline if plans change.',
  },
  {
    id: 'faq-3',
    question: 'Where do I report a bug or broken page?',
    answer:
      'Email us through Contact us with the page URL, what you expected, and your browser. We prioritize issues that block reading or publishing.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer refunds for retreats or events?',
    answer:
      `${SITE_CONFIG.name} publishes editorial content; hosts set their own cancellation policies. Always confirm terms directly with the retreat or studio you book.`,
  },
]

export default function HelpPage() {
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            Help Center
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3rem] lg:leading-[1.08]">
            Answers for readers, writers, and{' '}
            <span className="text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text">retreat planners</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Practical guidance for using {SITE_CONFIG.name}—without the generic help-desk tone. If you are stuck, we would rather hear from you than leave you
            guessing.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-full bg-[linear-gradient(90deg,#a855f7,#ec4899)] px-7 py-6 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(168,85,247,0.35)] hover:brightness-105">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact support
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full border-slate-200/80 bg-white/80 px-7 py-6 text-sm font-semibold shadow-sm hover:border-violet-200/80">
              <Link href="/articles">
                Browse articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {guides.map((g) => (
            <div
              key={g.title}
              className="rounded-[1.5rem] border border-white/70 bg-white/70 p-7 shadow-[0_20px_60px_rgba(168,85,247,0.1)] backdrop-blur-xl transition hover:border-violet-200/80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{g.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{g.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-violet-700">
              <LifeBuoy className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">Still stuck?</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">We read every message.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Tell us what you were trying to do, what happened instead, and any links or screenshots. We typically reply within two business days—faster when
              something is blocking publishing.
            </p>
            <Link href="/status" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Check system status
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-white/60 bg-white/55 p-7 shadow-[0_18px_60px_rgba(236,72,153,0.08)] backdrop-blur-xl sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">Frequently asked</h3>
            <Accordion type="single" collapsible className="mt-5 w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-violet-100/80">
                  <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </EditorialPageShell>
  )
}
