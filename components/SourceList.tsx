import { SOURCE_TYPE_LABEL } from '@/lib/format';
import type { Source } from '@/lib/schemas';

export default function SourceList({ sources }: { sources: Source[] }) {
    if (sources.length === 0) return null;
    return (
        <ul className="divide-y divide-line border-y border-line font-ui">
            {sources.map((s, i) => (
                <li
                    key={i}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                >
                    <span className="text-ink">
                        {s.url ? (
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-line underline-offset-4 hover:decoration-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                            >
                                {s.name}
                                <span className="sr-only">
                                    {' '}
                                    (নতুন ট্যাবে খুলবে)
                                </span>
                            </a>
                        ) : (
                            s.name
                        )}
                    </span>
                    <span className="text-sm text-muted">
                        {SOURCE_TYPE_LABEL[s.type]}
                    </span>
                    {s.note && (
                        <p className="w-full text-sm text-muted">{s.note}</p>
                    )}
                </li>
            ))}
        </ul>
    );
}
