import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import { getCategory } from '@/data/categories';
import { countArticles, getArticles } from '@/lib/articles';
import { toBn } from '@/lib/format';
import { paginate, parsePage } from '@/lib/pagination';
import { robotsWhileDummy } from '@/lib/seo';

const PAGE_SIZE = 9;

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = getCategory((await params).slug);
    if (!category) return {};
    return {
        title: category.label,
        description: `${category.label} বিভাগের সর্বশেষ খবর।`,
        robots: robotsWhileDummy,
    };
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const category = getCategory((await params).slug);
    if (!category) notFound();

    const page = parsePage((await searchParams).page);
    const total = await countArticles({ category: category.slug });
    const { pages, offset } = paginate(total, page, PAGE_SIZE);
    if (page > pages) notFound();

    const items = await getArticles({
        category: category.slug,
        limit: PAGE_SIZE,
        offset,
    });

    return (
        <main className="mx-auto max-w-6xl px-4 py-8">
            <PageHeading
                title={category.label}
                description={total > 0 ? `মোট ${toBn(total)}টি খবর` : undefined}
            />

            {items.length === 0 ? (
                <p className="py-16 text-center font-ui text-muted">
                    এই বিভাগে এখনো কোনো খবর নেই।
                </p>
            ) : (
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((a, i) => (
                        <ArticleCard
                            key={a.id}
                            article={a}
                            priority={page === 1 && i < 3}
                        />
                    ))}
                </div>
            )}

            <Pagination
                current={page}
                total={pages}
                basePath={`/category/${category.slug}`}
            />
        </main>
    );
}
