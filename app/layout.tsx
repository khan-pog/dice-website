import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = 'https://arcanedice.shop'
const ogImage = '/images/products/shadowthorn-1.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Arcane Dice Co. | Premium Handcrafted Dice',
    template: '%s | Arcane Dice Co.',
  },
  description: 'Discover premium handcrafted polyhedral dice for tabletop gaming. Each set is precision-engineered for perfect balance and stunning beauty.',
  keywords: ['polyhedral dice', 'handcrafted dice', 'D&D dice', 'tabletop dice', 'RPG dice', 'resin dice', 'metal dice', 'dice set'],
  openGraph: {
    type: 'website',
    siteName: 'Arcane Dice Co.',
    title: 'Arcane Dice Co. | Premium Handcrafted Dice',
    description: 'Discover premium handcrafted polyhedral dice for tabletop gaming. Each set is precision-engineered for perfect balance and stunning beauty.',
    url: siteUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Arcane Dice Co. premium handcrafted polyhedral dice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcane Dice Co. | Premium Handcrafted Dice',
    description: 'Discover premium handcrafted polyhedral dice for tabletop gaming. Each set is precision-engineered for perfect balance and stunning beauty.',
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1625',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-sans antialiased">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Arcane Dice Co.",
                url: siteUrl,
                logo: `${siteUrl}/icon.svg`,
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "support@arcanedice.co",
                  contactType: "customer service",
                },
                sameAs: [],
              }),
            }}
          />
          <CartProvider>
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
