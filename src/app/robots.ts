// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/register', '/login'],
    },
    sitemap: 'https://www.tailio.in/sitemap.xml',
  }
}