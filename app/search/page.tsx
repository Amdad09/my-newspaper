import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import PageHeading from '@/components/PageHeading';
import { searchArticles } from '@/lib/articles';
import { toBn } from '@/lib/format';

const MAX_RESULTS = 30;

type Props = { searchParams: Promise<{ q?: string }> };

const readQuery = async (searchParams: Props['searchParams']) =>
    ((await searchParams).q ?? '').trim().slice(0, 100);

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const q = await readQuery(searchParams);
    return {
        title: q ? `“${q}” অনুসন্ধান` : 'অনুসন্ধান',
        // search result pages should never be indexed
        robots: { index: false, follow: true },
    };
}

export default async function SearchPage({ searchParams }: Props) {
    const q = await readQuery(searchParams);
    const found = q ? await searchArticles(q) : [];
    const results = found.slice(0, MAX_RESULTS);

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <PageHeading title="অনুসন্ধান" />

            <form
                action="/search"
                method="get"
                role="search"
                className="mb-8 flex border border-line bg-white font-ui"
            >
                <label htmlFor="q" className="sr-only">
                    খবর খুঁজুন
                </label>
                <input
                    id="q"
                    name="q"
                    type="search"
                    defaultValue={q}
                    placeholder="কী খুঁজছেন?"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-ink placeholder:text-muted focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-navy px-6 text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                    খুঁজুন
                </button>
            </form>

            {!q ? (
                <p className="font-ui text-muted">
                    শিরোনাম, সারসংক্ষেপ বা ট্যাগের শব্দ লিখে খুঁজুন।
                </p>
            ) : found.length === 0 ? (
                <p role="status" className="font-ui text-muted">
                    “{q}” দিয়ে কোনো খবর পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা
                    করুন।
                </p>
            ) : (
                <>
                    <p
                        role="status"
                        className="mb-6 font-ui text-sm text-muted"
                    >
                        {toBn(found.length)}টি ফল
                        {found.length > MAX_RESULTS &&
                            `, প্রথম ${toBn(MAX_RESULTS)}টি দেখানো হচ্ছে`}
                    </p>
                    <div className="divide-y divide-line">
                        {results.map((a) => (
                            <div key={a.id} className="py-5 first:pt-0">
                                <ArticleCard article={a} variant="list" />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}
