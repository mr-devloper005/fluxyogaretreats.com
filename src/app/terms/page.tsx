import Link from 'next/link'
import { ArrowRight, FileText, Scale, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Using the site',
    body: `By accessing ${SITE_CONFIG.name}, you agree to these terms and to any posted guidelines. If you disagree, please do not use the service.`,
  },
  {
    title: 'Accounts',
    body:
      'You are responsible for your login credentials and for activity under your account. Notify us promptly if you suspect unauthorized access.',
  },
  {
    title: 'Content & license',
    body:
      'You retain ownership of content you publish. By posting, you grant us a non-exclusive license to host, display, distribute, and promote your content in connection with operating and marketing the journal.',
  },
  {
    title: 'Acceptable use',
    body:
      'Do not post unlawful, hateful, harassing, or deceptive material; do not attempt to disrupt the platform, scrape at scale without permission, or misuse others’ intellectual property.',
  },
  {
    title: 'Disclaimers',
    body:
      'Editorial content is for information and inspiration—not medical, legal, or financial advice. Retreat and travel decisions remain your responsibility.',
  },
  {
    title: 'Limitation of liability',
    body:
      'To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from your use of the site. Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the maximum permitted.',
  },
  {
    title: 'Changes',
    body:
      'We may update these terms. We will post the revised date at the top of this page. Continued use after changes constitutes acceptance.',
  },
]

export default function TermsPage() {
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            Legal
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Terms of service</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Rules for using {SITE_CONFIG.name}. Last updated: April 16, 2026.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700">
              <Scale className="h-6 w-6" />
            </div>
            <p className="text-sm leading-7 text-slate-600">
              These terms work alongside our{' '}
              <Link href="/privacy" className="font-semibold text-violet-700 underline-offset-4 hover:underline">
                Privacy policy
              </Link>{' '}
              and{' '}
              <Link href="/cookies" className="font-semibold text-violet-700 underline-offset-4 hover:underline">
                Cookie policy
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {sections.map((s) => (
              <div key={s.title} className="rounded-2xl border border-violet-100/80 bg-white/85 p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-fuchsia-100/80 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/60 p-6">
            <p className="text-sm text-slate-700">For licensing or legal notices directed at {SITE_CONFIG.name}, use Contact with “Legal” in the subject line.</p>
            <Link href="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Open contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageShell>
  )
}
