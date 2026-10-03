import type { Metadata } from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import type { ReactNode } from 'react';
import DummyNotice from '@/components/DummyNotice';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { robotsWhileDummy } from '@/lib/seo';
import { SITE_NAME, TAGLINE } from '@/lib/site';
import './globals.css';

const serif = Noto_Serif_Bengali({
    subsets: ['bengali', 'latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--font-serif-bn',
});
const ui = Hind_Siliguri({
    subsets: ['bengali', 'latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-ui-bn',
});

export const metadata: Metadata = {
    // used to build absolute URLs for social previews; set it in production
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    ),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: TAGLINE,
    openGraph: { siteName: SITE_NAME, locale: 'bn_BD', type: 'website' },
    robots: robotsWhileDummy,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="bn">
            <body
                className={`${serif.variable} ${ui.variable} flex min-h-dvh flex-col bg-paper font-ui text-ink antialiased`}
            >
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-navy focus:outline-2 focus:outline-navy"
                >
                    মূল লেখায় যান
                </a>
                <DummyNotice />
                <Navbar />
                <div
                    id="main-content"
                    tabIndex={-1}
                    className="flex-1 outline-none"
                >
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
