import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import { countArticles, getArticles } from '@/lib/articles';
import { toBn } from '@/lib/format';
import { paginate, parsePage } from '@/lib/pagination';
import { robotsWhileDummy } from '@/lib/seo';

const PAGE_SIZE = 10;

type Props = { searchParams: Promise<{ page?: string }> };

export const metadata: Metadata = {
    title: 'সর্বশেষ খবর',
    description: 'সময়ের ক্রমে সব সর্বশেষ খবর।',
    robots: robotsWhileDummy,
};

export default async function LatestPage({ searchParams }: Props) {
    const page = parsePage((await searchParams).page);
    const total = await countArticles();
    const { pages, offset } = paginate(total, page, PAGE_SIZE);
    if (page > pages) notFound();

    const items = await getArticles({ limit: PAGE_SIZE, offset });

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <PageHeading
                title="সর্বশেষ খবর"
                description={`মোট ${toBn(total)}টি খবর`}
            />

            <div className="divide-y divide-line">
                {items.map((a, i) => (
                    <div key={a.id} className="py-5 first:pt-0">
                        <ArticleCard
                            article={a}
                            variant="list"
                            priority={page === 1 && i === 0}
                        />
                    </div>
                ))}
            </div>

            <Pagination current={page} total={pages} basePath="/latest" />
        </main>
    );
}
