import Link from 'next/link';
import { toBn } from '@/lib/format';

type Props = { current: number; total: number; basePath: string };

const base =
    'min-w-10 border px-3 py-1.5 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy';

const href = (basePath: string, n: number) =>
    n === 1 ? basePath : `${basePath}?page=${n}`;

// 1 … 4 5 6 … 12  (first, last, and the neighbours of the current page)
function pageList(current: number, total: number) {
    const keep = new Set([1, total, current - 1, current, current + 1]);
    const nums = [...keep]
        .filter((n) => n >= 1 && n <= total)
        .sort((a, b) => a - b);
    const out: (number | 'gap')[] = [];
    nums.forEach((n, i) => {
        if (i > 0 && n - nums[i - 1] > 1) out.push('gap');
        out.push(n);
    });
    return out;
}

export default function Pagination({ current, total, basePath }: Props) {
    if (total <= 1) return null;

    return (
        <nav
            aria-label="পৃষ্ঠা"
            className="mt-10 flex flex-wrap items-center gap-2 font-ui text-sm"
        >
            {current > 1 && (
                <Link
                    href={href(basePath, current - 1)}
                    className={`${base} border-line text-ink hover:border-navy`}
                >
                    আগের পাতা
                </Link>
            )}

            {pageList(current, total).map((item, i) =>
                item === 'gap' ? (
                    <span
                        key={`g${i}`}
                        aria-hidden="true"
                        className="px-1 text-muted"
                    >
                        …
                    </span>
                ) : item === current ? (
                    <span
                        key={item}
                        aria-current="page"
                        className={`${base} border-navy bg-navy text-paper`}
                    >
                        {toBn(item)}
                    </span>
                ) : (
                    <Link
                        key={item}
                        href={href(basePath, item)}
                        className={`${base} border-line text-ink hover:border-navy`}
                    >
                        <span className="sr-only">পাতা </span>
                        {toBn(item)}
                    </Link>
                ),
            )}

            {current < total && (
                <Link
                    href={href(basePath, current + 1)}
                    className={`${base} border-line text-ink hover:border-navy`}
                >
                    পরের পাতা
                </Link>
            )}
        </nav>
    );
}
