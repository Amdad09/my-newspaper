import type { Metadata } from 'next';
import Link from 'next/link';
import StaticPage, { Section } from '@/components/StaticPage';
import { getArticles } from '@/lib/articles';
import { formatDateTime } from '@/lib/format';
import { robotsWhileDummy } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'সংশোধনী নীতি',
    description: 'ভুল হলে আমরা কী করি এবং এ পর্যন্ত প্রকাশিত সংশোধনী।',
    robots: robotsWhileDummy,
};

export default async function CorrectionsPage() {
    const all = await getArticles();
    const corrected = all
        .filter((a) => a.corrections.length > 0)
        .map((a) => ({
            article: a,
            latest: [...a.corrections].sort(
                (x, y) => +new Date(y.at) - +new Date(x.at),
            )[0],
        }))
        .sort((x, y) => +new Date(y.latest.at) - +new Date(x.latest.at));

    return (
        <StaticPage title="সংশোধনী নীতি" description="ভুল হলে আমরা কী করি">
            <Section title="আমরা কী করি">
                <p>
                    ভুল ধরা পড়লে আমরা লেখাটি সংশোধন করি এবং লেখার নিচে সংশোধনীর
                    কারণ ও সময় প্রকাশ করি। পুরোনো ভুল চুপচাপ মুছে ফেলা হয় না।
                </p>
            </Section>

            <Section title="ভুল জানাবেন যেভাবে">
                <p>
                    [ভুল জানানোর ইমেইল বা ফর্মের ঠিকানা এখানে দিন। কত সময়ের
                    মধ্যে সাড়া দেবেন, সেটা যদি রাখতে পারেন তবেই লিখুন।]
                </p>
            </Section>

            <Section title="সাম্প্রতিক সংশোধনী">
                {corrected.length === 0 ? (
                    <p>এখনো কোনো সংশোধনী প্রকাশ করা হয়নি।</p>
                ) : (
                    <ul className="divide-y divide-line border-y border-line font-ui text-base">
                        {corrected.map(({ article, latest }) => (
                            <li key={article.id} className="py-4">
                                <Link
                                    href={`/news/${article.slug}#corrections`}
                                    className="font-serif text-lg font-bold text-ink underline-offset-4 hover:underline"
                                >
                                    {article.title}
                                </Link>
                                <time
                                    dateTime={latest.at}
                                    className="mt-1 block text-sm text-muted"
                                >
                                    {formatDateTime(latest.at)}
                                </time>
                                <p className="mt-1 text-ink">{latest.text}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </Section>
        </StaticPage>
    );
}
