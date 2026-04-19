export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '5psvhebc8g',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Flux Yoga Retreats',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Editorial stories for mindful movement and retreat life',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Long-form articles on yoga retreats, movement science, travel notes, and the culture of restorative travel.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'fluxyogaretreats.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fluxyogaretreats.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

