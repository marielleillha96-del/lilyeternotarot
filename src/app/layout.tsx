import type { Metadata } from 'next';
import { Cinzel, Manrope } from 'next/font/google';
import './globals.css';
import { site } from '../config/site';

const display = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: site.tagline,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  alternates: {
    canonical: site.canonicalPath,
  },
  metadataBase: new URL(site.siteUrl),
  icons: {
    icon: site.heroImage,
    shortcut: site.heroImage,
    apple: site.heroImage,
  },
  openGraph: {
    title: site.tagline,
    description: site.description,
    url: site.siteUrl,
    siteName: site.shortName,
    type: 'website',
    images: [
      {
        url: site.heroImage,
        width: 1200,
        height: 630,
        alt: site.tagline,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.tagline,
    description: site.description,
    images: [site.heroImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} bg-[#08050d] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
