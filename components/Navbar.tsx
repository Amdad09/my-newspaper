/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SITE_NAME = 'জনদৃষ্টি'; // placeholder: replace with your brand
const TAGLINE = 'তথ্য, সূত্র ও জবাবদিহি';

const PRIMARY = [
    { label: 'সর্বশেষ', href: '/latest' },
    { label: 'বাংলাদেশ', href: '/category/bangladesh' },
    { label: 'রাজনীতি', href: '/category/politics' },
    { label: 'অর্থনীতি', href: '/category/economy' },
    { label: 'বিশ্ব', href: '/category/world' },
    { label: 'প্রযুক্তি', href: '/category/technology' },
    { label: 'খেলা', href: '/category/sports' },
    { label: 'অনুসন্ধান', href: '/category/investigation' },
];

const MORE = [
    { label: 'শিক্ষা', href: '/category/education' },
    { label: 'স্বাস্থ্য', href: '/category/health' },
    { label: 'সমাজ', href: '/category/society' },
    { label: 'মতামত', href: '/category/opinion' },
];

const INFO = [
    { label: 'আমাদের নীতিমালা', href: '/policy' },
    { label: 'সংশোধনী', href: '/corrections' },
    { label: 'যোগাযোগ', href: '/contact' },
];

function useDhakaDate() {
    const [text, setText] = useState('');
    useEffect(() => {
        setText(
            new Intl.DateTimeFormat('bn-BD', {
                timeZone: 'Asia/Dhaka',
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(new Date()),
        );
    }, []);
    return text;
}

const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy';

function SearchIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const today = useDhakaDate();
    const [open, setOpen] = useState(false);

    // close drawer on route change
    useEffect(() => setOpen(false), [pathname]);

    // Escape to close + lock body scroll while open
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) =>
            e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [open]);

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + '/');

    return (
        <>
            <header className="border-b border-line bg-paper font-ui">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm text-muted">
                    <time className="min-h-5">{today}</time>
                    <Link
                        href="/corrections"
                        className={`hidden hover:text-ink sm:inline ${focusRing}`}
                    >
                        সংশোধনী
                    </Link>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 pb-4 pt-1">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-expanded={open}
                        aria-controls="site-drawer"
                        className={`flex w-fit items-center gap-2 py-2 text-ink ${focusRing}`}
                    >
                        <MenuIcon />
                        <span className="hidden sm:inline">মেনু</span>
                        <span className="sr-only sm:hidden">মেনু খুলুন</span>
                    </button>

                    <Link href="/" className={`text-center ${focusRing}`}>
                        <span className="block font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
                            {SITE_NAME}
                        </span>
                        <span className="mt-1 block text-xs text-muted sm:text-sm">
                            {TAGLINE}
                        </span>
                    </Link>

                    <Link
                        href="/search"
                        aria-label="অনুসন্ধান করুন"
                        className={`ml-auto flex w-fit items-center gap-2 py-2 text-ink ${focusRing}`}
                    >
                        <span className="hidden sm:inline">খুঁজুন</span>
                        <SearchIcon />
                    </Link>
                </div>
            </header>

            <nav
                aria-label="প্রধান বিভাগ"
                className="sticky top-0 z-40 border-b border-line border-t-2 border-t-navy bg-paper/95 font-ui backdrop-blur"
            >
                <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
                    {PRIMARY.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.href} className="shrink-0">
                                <Link
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative block px-3 py-3 text-[0.95rem] transition-colors ${focusRing} ${
                                        active
                                            ? 'font-semibold text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-navy'
                                            : 'text-muted hover:text-ink'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Drawer */}
            <div
                id="site-drawer"
                inert={!open}
                aria-hidden={!open}
                className={`fixed inset-0 z-50 ${open ? 'visible' : 'invisible delay-200'}`}
            >
                <button
                    type="button"
                    aria-label="মেনু বন্ধ করুন"
                    tabIndex={-1}
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
                />
                <aside
                    role="dialog"
                    aria-modal="true"
                    aria-label="সাইট মেনু"
                    className={`absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-paper p-5 font-ui shadow-xl transition-transform duration-200 ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="mb-5 flex items-center justify-between">
                        <span className="font-serif text-2xl font-bold text-ink">
                            {SITE_NAME}
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className={`px-2 py-1 text-muted hover:text-ink ${focusRing}`}
                        >
                            বন্ধ করুন
                        </button>
                    </div>

                    <form
                        action="/search"
                        method="get"
                        role="search"
                        className="mb-6"
                    >
                        <label htmlFor="drawer-q" className="sr-only">
                            অনুসন্ধান
                        </label>
                        <div className="flex border border-line bg-white">
                            <input
                                id="drawer-q"
                                name="q"
                                type="search"
                                placeholder="কী খুঁজছেন?"
                                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-ink placeholder:text-muted focus:outline-none"
                            />
                            <button
                                type="submit"
                                aria-label="খুঁজুন"
                                className={`px-3 text-ink ${focusRing}`}
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </form>

                    <p className="mb-2 text-sm text-muted">বিভাগ</p>
                    <ul className="mb-6 border-t border-line">
                        {[...PRIMARY, ...MORE].map((item) => (
                            <li
                                key={item.href}
                                className="border-b border-line"
                            >
                                <Link
                                    href={item.href}
                                    className={`block py-3 text-ink ${focusRing}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul className="space-y-2 text-sm text-muted">
                        {INFO.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`hover:text-ink ${focusRing}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </>
    );
}
