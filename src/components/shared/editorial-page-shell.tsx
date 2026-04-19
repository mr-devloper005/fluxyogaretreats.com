import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function EditorialPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#faf5ff_0%,#ffffff_38%,#fdf2f8_100%)] text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_320px_at_12%_-8%,rgba(168,85,247,0.18),transparent_58%),radial-gradient(480px_280px_at_92%_8%,rgba(236,72,153,0.12),transparent_55%)]"
        aria-hidden
      />
      <NavbarShell />
      {children}
      <Footer />
    </div>
  )
}
