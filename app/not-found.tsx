import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
            <h1 className="font-serif text-3xl font-bold text-ink">
                পাতাটি পাওয়া যায়নি
            </h1>
            <p className="mt-3 font-ui text-muted">
                লিংকটি ভুল হতে পারে, অথবা পাতাটি সরিয়ে নেওয়া হয়েছে।
            </p>
            <Link
                href="/"
                className="mt-6 inline-block font-ui text-navy underline underline-offset-4"
            >
                প্রথম পাতায় ফিরুন
            </Link>
        </main>
    );
}
