import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass, FileText, Globe2, Image as ImageIcon, LayoutGrid, MapPin, PenLine, Quote, ShieldCheck, Sparkles, Star, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

function postTask(post: SitePost): unknown {
  return (post as SitePost & { task?: unknown }).task
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getEditorialTone() {
  return {
    shell: 'relative overflow-hidden bg-[linear-gradient(180deg,#faf5ff_0%,#ffffff_38%,#fdf2f8_100%)] text-slate-900',
    panel:
      'rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[0_24px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/55',
    soft: 'rounded-[1.5rem] border border-white/60 bg-white/50 shadow-[0_12px_40px_rgba(236,72,153,0.08)] backdrop-blur-md',
    muted: 'text-slate-600',
    title: 'text-slate-900',
    badge:
      'border border-violet-200/80 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]',
    action:
      'bg-[linear-gradient(90deg,#a855f7,#ec4899)] text-white shadow-[0_16px_44px_rgba(168,85,247,0.35)] hover:brightness-105 active:scale-[0.99]',
    actionAlt: 'rounded-full border border-slate-200/80 bg-white/80 text-slate-900 shadow-sm hover:border-violet-200/80 hover:bg-white',
    glow: 'pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_320px_at_18%_-8%,rgba(168,85,247,0.22),transparent_58%),radial-gradient(480px_280px_at_92%_8%,rgba(236,72,153,0.18),transparent_55%)]',
    mediaFrame: 'relative overflow-hidden rounded-[1.35rem] border border-white/60 bg-slate-900/5 shadow-inner',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(postTask(post), profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || String(postTask(post) || 'Profile')}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts }: { primaryTask?: EnabledTask; articlePosts: SitePost[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)
  const blogPosts = articlePosts.slice(0, 6)
  const partners = ['Retreat hosts', 'Studios', 'Publishers', 'Guides', 'Collectives']
  const stats = [
    { label: 'Stories published', value: '180+', icon: FileText },
    { label: 'Readers monthly', value: '48k', icon: Globe2 },
    { label: 'Host cities', value: '32', icon: MapPin },
    { label: 'Reader rating', value: '4.9', icon: Star },
  ]
  const steps = [
    {
      title: 'Choose a theme',
      body: 'Browse dispatches by region, lineage, or the kind of rest you are designing for.',
      visual: 'bg-[linear-gradient(135deg,#ede9fe,#fce7f3)]',
    },
    {
      title: 'Read with focus',
      body: 'Layouts prioritize line length, breathing room, and imagery that supports the narrative.',
      visual: 'bg-[linear-gradient(135deg,#fae8ff,#e0e7ff)]',
    },
    {
      title: 'Save what matters',
      body: 'Create a reader account to keep itineraries, quotes, and packing lists in one calm shelf.',
      visual: 'bg-[linear-gradient(135deg,#fdf2f8,#eef2ff)]',
    },
  ]
  const team = [
    { name: 'Mira Ashwin', role: 'Editor-in-chief', initials: 'MA' },
    { name: 'Noah Calder', role: 'Field writer', initials: 'NC' },
    { name: 'Sofia Reyes', role: 'Visual essays', initials: 'SR' },
  ]

  return (
    <main className={tone.shell}>
      <div className={tone.glow} aria-hidden />
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${tone.badge}`}>
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            {siteContent.hero.badge}
          </span>
          <h1 className={`mt-7 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08] ${tone.title}`}>
            Discover <em className="font-serif not-italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">who we are</em> and why{' '}
            <em className="font-serif not-italic text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-violet-600">we built this journal</em> for retreat life.
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${tone.muted}`}>{SITE_CONFIG.description}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition ${tone.action}`}>
              {siteContent.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={siteContent.hero.secondaryCta.href} className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition ${tone.actionAlt}`}>
              {siteContent.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className={`mx-auto mt-14 max-w-5xl ${tone.mediaFrame}`}>
          <div className="relative aspect-[16/9] w-full">
            {lead ? (
              <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 text-sm font-medium text-slate-500">
                Featured story imagery appears here
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Trusted by teams who plan in seasons, not sprints</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {partners.map((name) => (
              <span key={name} className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm backdrop-blur">
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className={`flex flex-col gap-3 p-6 ${tone.soft}`}>
              <item.icon className="h-5 w-5 text-violet-600" />
              <p className="text-3xl font-semibold tracking-tight text-slate-900">{item.value}</p>
              <p className="text-sm font-medium text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700/80">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">From idea to itinerary without losing the plot.</h2>
            <p className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${tone.muted}`}>
              We treat every article like a studio session—clear structure, generous whitespace, and motion that nudges instead of shouting.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className={`flex flex-col overflow-hidden ${tone.panel}`}>
                <div className={`relative h-36 ${step.visual}`} />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${tone.badge}`}>
              <PenLine className="h-3.5 w-3.5 text-violet-600" />
              Inside this issue
            </span>
            <h2 className={`mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl ${tone.title}`}>Fresh lines from the road between retreats.</h2>
            <p className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${tone.muted}`}>
              Start with the lead essay, then move through shorter notes—each link keeps you inside the same calm visual system.
            </p>
          </div>
          <aside className={`p-6 sm:p-7 ${tone.panel}`}>
            <div className="space-y-5">
              {side.length ? (
                side.map((post) => (
                  <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-slate-200/70 pb-5 last:border-b-0 last:pb-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700/80">Feature</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                  </Link>
                ))
              ) : (
                <p className={`text-sm ${tone.muted}`}>New dispatches will appear in this column as soon as they publish.</p>
              )}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-16 overflow-hidden p-1 sm:p-2 ${tone.panel}`}>
            <div className="grid overflow-hidden rounded-[1.35rem] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[320px]">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700/80">Lead story</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 sm:text-base ${tone.muted}`}>{lead.summary || 'A deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700/80">The minds behind the magic</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">Editors, hosts, and visual storytellers.</h2>
            </div>
            <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${tone.actionAlt}`}>
              Meet the full team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className={`flex flex-col p-6 ${tone.panel}`}>
                <div className="flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-2xl font-semibold text-violet-800">{person.initials}</div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{person.name}</h3>
                <p className={`text-sm ${tone.muted}`}>{person.role}</p>
                <div className="mt-4 flex gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700/80">
                  <span className="rounded-full border border-violet-200/80 px-3 py-1">Profile</span>
                  <span className="rounded-full border border-violet-200/80 px-3 py-1">Notes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-20 ${tone.panel} p-8 sm:p-10`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-semibold text-white">AR</div>
            <div className="flex-1">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <Quote className="mt-4 h-8 w-8 text-violet-300" />
              <p className="mt-3 text-lg font-medium leading-relaxed text-slate-900">
                “I finally found a retreat journal that reads like a magazine—slow, honest, and obsessed with the details that actually matter on the mat.”
              </p>
              <p className={`mt-4 text-sm font-semibold text-slate-700`}>Alex R. · Reader since 2024</p>
            </div>
          </div>
        </div>

        {blogPosts.length > 0 ? (
          <div className="mt-20">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700/80">From pixels to personality</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">Latest articles from the Flux desk.</h2>
              </div>
              <Link href="/articles" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${tone.action}`}>
                See all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((item) => (
                <Link key={item.id} href={`/articles/${item.slug}`} className={`group flex flex-col overflow-hidden ${tone.panel}`}>
                  <div className="relative aspect-video w-full overflow-hidden">
                    <ContentImage src={getPostImage(item)} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="w-fit rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-800">Retreat journal</span>
                    <h3 className="mt-3 line-clamp-2 text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className={`mt-2 line-clamp-3 flex-1 text-sm leading-7 ${tone.muted}`}>{item.summary || 'Read the full story on the article page.'}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                      Continue reading
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-20 overflow-hidden rounded-[2rem] bg-[linear-gradient(110deg,#6d28d9_0%,#a855f7_38%,#ec4899_100%)] p-[1px] shadow-[0_30px_90px_rgba(109,40,217,0.35)]">
          <div className="rounded-[1.95rem] bg-[linear-gradient(145deg,rgba(15,23,42,0.65),rgba(15,23,42,0.35))] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
              <div className="flex -space-x-3">
                {['AR', 'SK', 'LM', 'JP', 'TQ'].map((initials) => (
                  <span key={initials} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-xs font-semibold backdrop-blur">
                    {initials}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{siteContent.cta.title}</h2>
              <p className="text-base text-violet-50/90 sm:text-lg">{siteContent.cta.description}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={siteContent.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 hover:bg-violet-50">
                  {siteContent.cta.primaryCta.label}
                </Link>
                <Link href={siteContent.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  {siteContent.cta.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(postTask(post), 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(postTask(post), 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
