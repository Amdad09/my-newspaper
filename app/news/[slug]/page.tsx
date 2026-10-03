import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import CorrectionNotice from '@/components/CorrectionNotice';
import SourceList from '@/components/SourceList';
import UpdateTimeline from '@/components/UpdateTimeline';
import VerificationBadge from '@/components/VerificationBadge';
import { getCategory } from '@/data/categories';
import { getArticleBySlug, getArticles, getRelated } from '@/lib/articles';
import { KIND_LABEL, formatDateTime, formatReadingTime } from '@/lib/format';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const a = await getArticleBySlug(slug);
    if (!a) return {};
    return {
        title: a.title,
        description: a.summary,
        // fake data must never reach search engines
        robots: a.isDummy ? { index: false, follow: false } : undefined,
        openGraph: {
            type: 'article',
            title: a.title,
            description: a.summary,
            publishedTime: a.publishedAt,
            modifiedTime: a.updatedAt ?? a.publishedAt,
            authors: [a.author.name],
            images: [
                {
                    url: a.image.src,
                    width: a.image.width,
                    height: a.image.height,
                    alt: a.image.alt,
                },
            ],
        },
    };
}

// Shown above the article when a reader should know before reading.
const CAUTION_NOTE = {
    in_review: 'এই প্রতিবেদনের তথ্য যাচাই চলছে। যাচাই শেষে হালনাগাদ করা হবে।',
    unverified:
        'এই দাবি স্বাধীনভাবে যাচাই করা যায়নি। উৎসের বক্তব্য হিসেবে পড়ুন।',
} as const;

const KIND_NOTE = {
    analysis: 'এটি বিশ্লেষণ: তথ্য সূত্রভিত্তিক, ব্যাখ্যা প্রতিবেদকের নিজস্ব।',
    opinion: 'এটি লেখকের ব্যক্তিগত মত, সংবাদ প্রতিবেদন নয়।',
    fact_check:
        'এই লেখায় প্রচারিত একটি দাবি মূল নথির সঙ্গে মিলিয়ে দেখা হয়েছে।',
} as const;

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const related = await getRelated(article, 3);
    const category = getCategory(article.category);
    const caution =
        article.verification === 'in_review' ||
        article.verification === 'unverified'
            ? CAUTION_NOTE[article.verification]
            : null;
    const kindNote = article.kind !== 'news' ? KIND_NOTE[article.kind] : null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.summary,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        author: [{ '@type': 'Person', name: article.author.name }],
        image: [article.image.src],
    };

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            {/* never emit structured data for fake articles */}
            {!article.isDummy && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                    }}
                />
            )}

            <article>
                <header>
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-ui text-sm">
                        {category && (
                            <Link
                                href={`/category/${category.slug}`}
                                className="font-semibold text-navy underline-offset-4 hover:underline"
                            >
                                {category.label}
                            </Link>
                        )}
                        {article.kind !== 'news' && (
                            <span className="text-muted">
                                {KIND_LABEL[article.kind]}
                            </span>
                        )}
                        <VerificationBadge status={article.verification} />
                    </div>

                    <h1 className="font-serif text-3xl font-bold leading-[1.3] text-ink sm:text-4xl lg:text-5xl">
                        {article.title}
                    </h1>
                    {article.subtitle && (
                        <p className="mt-3 font-serif text-xl leading-[1.6] text-muted">
                            {article.subtitle}
                        </p>
                    )}
                    <p className="mt-4 font-serif text-xl leading-[1.7] text-ink/80">
                        {article.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-y border-line py-3 font-ui text-sm text-muted">
                        <span>
                            লেখক:{' '}
                            <span className="text-ink">
                                {article.author.name}
                            </span>
                        </span>
                        <span>
                            প্রকাশ:{' '}
                            <time dateTime={article.publishedAt}>
                                {formatDateTime(article.publishedAt)}
                            </time>
                        </span>
                        {article.updatedAt && (
                            <span>
                                হালনাগাদ:{' '}
                                <time dateTime={article.updatedAt}>
                                    {formatDateTime(article.updatedAt)}
                                </time>
                            </span>
                        )}
                        <span>{formatReadingTime(article.content)}</span>
                        {article.corrections.length > 0 && (
                            <a
                                href="#corrections"
                                className="text-alert underline underline-offset-4"
                            >
                                সংশোধনী আছে
                            </a>
                        )}
                    </div>
                </header>

                {(caution || kindNote) && (
                    <div className="mt-6 space-y-2 border-l-4 border-caution bg-sand p-4 font-ui text-ink">
                        {caution && <p>{caution}</p>}
                        {kindNote && <p className="text-muted">{kindNote}</p>}
                    </div>
                )}

                <figure className="mt-6">
                    <Image
                        src={article.image.src}
                        alt={article.image.alt}
                        width={article.image.width}
                        height={article.image.height}
                        priority
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="h-auto w-full bg-sand"
                    />
                    {(article.image.caption || article.image.credit) && (
                        <figcaption className="mt-2 font-ui text-sm text-muted">
                            {article.image.caption}
                            {article.image.caption && article.image.credit
                                ? ' '
                                : ''}
                            {article.image.credit}
                        </figcaption>
                    )}
                </figure>

                {/* reading column: narrower than the header for comfortable line length */}
                <div className="mt-8 max-w-2xl space-y-10">
                    <div className="space-y-6 font-serif text-[1.15rem] leading-[1.9] text-ink sm:text-xl sm:leading-[1.9]">
                        {article.content.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    <CorrectionNotice corrections={article.corrections} />
                    <UpdateTimeline updates={article.updates} />

                    <section aria-labelledby="sources-title">
                        <h2
                            id="sources-title"
                            className="mb-1 font-serif text-xl font-bold text-ink"
                        >
                            তথ্যের উৎস
                        </h2>
                        {article.verification === 'verified' && (
                            <p className="mb-3 font-ui text-sm text-muted">
                                প্রতিবেদনের তথ্য নিচের সূত্রের সঙ্গে মিলিয়ে
                                দেখা হয়েছে।
                            </p>
                        )}
                        <SourceList sources={article.sources} />
                    </section>

                    {article.tags.length > 0 && (
                        <ul className="flex flex-wrap gap-2 font-ui text-sm text-muted">
                            {article.tags.map((t) => (
                                <li
                                    key={t}
                                    className="border border-line px-2 py-0.5"
                                >
                                    {t}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </article>

            {related.length > 0 && (
                <section
                    aria-labelledby="related-title"
                    className="mt-14 border-t-2 border-navy pt-6"
                >
                    <h2
                        id="related-title"
                        className="mb-6 font-serif text-2xl font-bold text-ink"
                    >
                        আরও পড়ুন
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((a) => (
                            <ArticleCard key={a.id} article={a} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
