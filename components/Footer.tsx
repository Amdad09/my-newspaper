import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { toBn } from '@/lib/format';
import { SITE_NAME, TAGLINE } from '@/lib/site';

const POLICY = [
    { label: 'আমাদের নীতিমালা', href: '/policy' },
    { label: 'সংশোধনী', href: '/corrections' },
    { label: 'আমাদের সম্পর্কে', href: '/about' },
    { label: 'যোগাযোগ', href: '/contact' },
];

const link =
    'hover:text-ink hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy';

export default function Footer() {
    const year = toBn(new Date().getFullYear());

    return (
        <footer className="mt-16 border-t-2 border-navy bg-sand font-ui">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[2fr_1fr_1fr]">
                <div>
                    <p className="font-serif text-2xl font-bold text-ink">
                        {SITE_NAME}
                    </p>
                    <p className="mt-1 text-sm text-muted">{TAGLINE}</p>
                    <p className="mt-4 max-w-prose font-serif leading-[1.8] text-ink/80">
                        প্রতিটি খবরে আমরা উৎস, প্রকাশের সময় ও হালনাগাদের সময়
                        দেখাই। ভুল হলে চুপচাপ বদলাই না, সংশোধনী প্রকাশ করি।
                    </p>
                </div>

                <nav aria-label="বিভাগ">
                    <h2 className="mb-3 text-sm text-muted">বিভাগ</h2>
                    <ul className="space-y-2 text-ink">
                        {CATEGORIES.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={`/category/${c.slug}`}
                                    className={link}
                                >
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-label="নীতি ও যোগাযোগ">
                    <h2 className="mb-3 text-sm text-muted">আমাদের কথা</h2>
                    <ul className="space-y-2 text-ink">
                        {POLICY.map((p) => (
                            <li key={p.href}>
                                <Link href={p.href} className={link}>
                                    {p.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="border-t border-line">
                <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted">
                    © {year} {SITE_NAME}
                </p>
            </div>
        </footer>
    );
}
