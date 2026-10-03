/* eslint-disable react/jsx-key */

import type { ReactNode } from 'react';
import RelativeTime from './RelativeTime';
import { formatReadingTime } from '@/lib/format';
import type { Article } from '@/lib/schemas';

type Props = {
    article: Article;
    showSource?: boolean;
    className?: string;
};

export default function MetaLine({
    article,
    showSource = true,
    className = '',
}: Props) {
    const source = article.sources[0]?.name;
    const items: ReactNode[] = [
        <RelativeTime iso={article.publishedAt} />,
        formatReadingTime(article.content),
        showSource && source ? `সূত্র: ${source}` : null,
    ].filter(Boolean);

    return (
        <div
            className={`flex flex-wrap gap-y-1 font-ui text-sm text-muted ${className}`}
        >
            {items.map((item, i) => (
                <span
                    key={i}
                    className={i > 0 ? 'ml-3 border-l border-line pl-3' : ''}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}
