import type { ReactNode } from 'react';
import PageHeading from './PageHeading';
import { isLive } from '@/lib/seo';

type Props = { title: string; description?: string; children: ReactNode };

export default function StaticPage({ title, description, children }: Props) {
    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <PageHeading title={title} description={description} />

            {!isLive && (
                <p
                    role="note"
                    className="mb-8 border-l-4 border-caution bg-sand p-4 font-ui text-sm text-ink"
                >
                    খসড়া: এই লেখা শুধু কাঠামো। [ ] চিহ্নিত অংশ পূরণ করুন এবং
                    বাকিটা নিজের আসল নীতি অনুযায়ী বদলে নিন।
                </p>
            )}

            <div className="max-w-2xl font-serif text-lg leading-[1.9] text-ink sm:text-xl sm:leading-[1.9]">
                {children}
            </div>
        </main>
    );
}

export function Section({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="mt-10 first:mt-0">
            <h2 className="font-serif text-2xl font-bold text-ink">{title}</h2>
            <div className="mt-3 space-y-4">{children}</div>
        </section>
    );
}
