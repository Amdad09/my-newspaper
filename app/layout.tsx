import DummyNotice from '@/components/DummyNotice';
import './globals.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';

const serif = Noto_Serif_Bengali({
    subsets: ['bengali', 'latin'],
    variable: '--font-serif-bn',
});

const ui = Hind_Siliguri({
    subsets: ['bengali', 'latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ui-bn',
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${serif.variable} ${ui.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <DummyNotice />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
