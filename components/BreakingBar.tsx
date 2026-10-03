import Link from 'next/link';
import type { Article } from '@/lib/schemas';

// Use sparingly: only one article at a time can be flagged `breaking`.
export default function BreakingBar({ article }: { article: Article }) {
    return (
        <div className="border-b border-line bg-paper font-ui">
            <div className="mx-auto flex max-w-6xl items-baseline gap-3 px-4 py-2.5">
                <span className="shrink-0 text-sm font-semibold text-alert">
                    জরুরি
                </span>
                <Link
                    href={`/news/${article.slug}`}
                    className="min-w-0 truncate text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                    {article.title}
                </Link>
            </div>
        </div>
    );
}
