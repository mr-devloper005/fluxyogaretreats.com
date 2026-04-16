import Link from 'next/link'
import { ArrowRight, Lock, Shield, Sparkles } from 'lucide-react'
import { EditorialPageShell } from '@/components/shared/editorial-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'What we collect',
    body: `We collect information you provide when you create an account, publish articles, or contact us—such as your name, email, and the content you submit. We also collect limited technical data (for example device and browser type) to keep ${SITE_CONFIG.name} secure and fast.`,
  },
  {
    title: 'How we use information',
    body:
      'We use your data to operate the site, personalize your experience, send essential service messages, and improve our editorial tools. We do not sell your personal information.',
  },
  {
    title: 'Sharing',
    body:
      'We share information with service providers who help us host, analyze, or secure the platform, bound by confidentiality. We may disclose information if required by law or to protect the rights and safety of our community.',
  },
  {
    title: 'Retention & deletion',
    body:
      'We keep account and content data while your account is active. You can request deletion of your account; some records may be retained where law or legitimate business needs require it.',
  },
  {
    title: 'Your choices',
    body:
      'You can update profile details, adjust cookie preferences where available, and opt out of non-essential communications. Contact us if you need help exercising privacy rights in your region.',
  },
]

export default function PrivacyPage() {
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-800">
            <Sparkles className="h-3.5 w-3.5" />
            Legal
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Privacy policy</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            How {SITE_CONFIG.name} handles personal information. Last updated: April 16, 2026.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-wrap items-center gap-4 text-violet-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
              <Shield className="h-6 w-6" />
            </div>
            <p className="text-sm leading-7 text-slate-600">
              This summary is meant to be readable. For specific agreements (for example contributor terms), see our{' '}
              <Link href="/terms" className="font-semibold text-violet-700 underline-offset-4 hover:underline">
                Terms
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 space-y-6">
            {sections.map((s) => (
              <div key={s.title} className="rounded-2xl border border-violet-100/80 bg-white/85 p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-fuchsia-100/80 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/60 p-6">
            <p className="text-sm text-slate-700">Questions about privacy? We respond thoughtfully, not with boilerplate.</p>
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
