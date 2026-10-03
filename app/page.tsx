import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import BreakingBar from '@/components/BreakingBar';
import SectionHeader from '@/components/SectionHeader';
import { getCategory, type CategorySlug } from '@/data/categories';
import { getArticles, getBreaking, getFeatured } from '@/lib/articles';
import type { Article } from '@/lib/schemas';
import { robotsWhileDummy } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
    description: 'উৎস, প্রমাণ ও সংশোধনীসহ বাংলাদেশের খবর।',
    robots: robotsWhileDummy,
};

// Category blocks shown below the fold, in this order.
const BLOCKS: CategorySlug[] = [
    'bangladesh',
    'economy',
    'technology',
    'sports',
];

export default async function Home() {
    const [breaking, featured, latestAll, investigations, opinions, ...blocks] =
        await Promise.all([
            getBreaking(),
            getFeatured(3),
            getArticles({ limit: 12 }),
            getArticles({ category: 'investigation', limit: 1 }),
            getArticles({ category: 'opinion', limit: 3 }),
            ...BLOCKS.map((category) => getArticles({ category, limit: 3 })),
        ]);

    // Keep the top of the page free of repeats.
    const used = new Set<string>();
    // Marks each article as used while walking the list, so duplicates inside
    // the list itself (e.g. [...featured, ...latestAll]) are skipped too.
    const pick = (list: Article[], n: number) => {
        const out: Article[] = [];
        for (const a of list) {
            if (out.length === n) break;
            if (used.has(a.id)) continue;
            used.add(a.id);
            out.push(a);
        }
        return out;
    };

    const investigation = pick(investigations, 1)[0];
    const [lead] = pick([...featured, ...latestAll], 1);
    const side = pick([...featured, ...latestAll], 3);
    const latest = pick(latestAll, 6);

    if (!lead) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-24 text-center font-ui text-muted">
                এখনো কোনো খবর প্রকাশিত হয়নি।
            </main>
        );
    }

    return (
        <>
            {breaking && <BreakingBar article={breaking} />}

            <main className="mx-auto max-w-6xl space-y-14 px-4 py-8">
                <h1 className="sr-only">{SITE_NAME}: প্রথম পাতা</h1>

                <section
                    aria-label="প্রধান খবর"
                    className="grid gap-10 lg:grid-cols-12"
                >
                    <div className="lg:col-span-8">
                        <ArticleCard article={lead} variant="lead" priority />
                    </div>
                    <div className="divide-y divide-line lg:col-span-4">
                        {side.map((a) => (
                            <div key={a.id} className="py-4 first:pt-0">
                                <ArticleCard article={a} variant="list" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid gap-12 lg:grid-cols-12">
                    <section className="lg:col-span-8">
                        <SectionHeader title="সর্বশেষ" href="/latest" />
                        <div className="divide-y divide-line">
                            {latest.map((a) => (
                                <div key={a.id} className="py-5 first:pt-0">
                                    <ArticleCard article={a} variant="list" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-10 lg:col-span-4">
                        {investigation && (
                            <section>
                                <SectionHeader
                                    title="অনুসন্ধান"
                                    href="/category/investigation"
                                />
                                <ArticleCard article={investigation} />
                            </section>
                        )}
                        {opinions.length > 0 && (
                            <section>
                                <SectionHeader
                                    title="মতামত"
                                    href="/category/opinion"
                                />
                                <div className="divide-y divide-line">
                                    {opinions.map((a) => (
                                        <div
                                            key={a.id}
                                            className="py-4 first:pt-0"
                                        >
                                            <ArticleCard
                                                article={a}
                                                variant="list"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>
                </div>

                {BLOCKS.map((slug, i) => {
                    const items = blocks[i];
                    if (!items?.length) return null;
                    return (
                        <section key={slug}>
                            <SectionHeader
                                title={getCategory(slug)?.label ?? slug}
                                href={`/category/${slug}`}
                            />
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((a) => (
                                    <ArticleCard key={a.id} article={a} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </main>
        </>
    );
}
