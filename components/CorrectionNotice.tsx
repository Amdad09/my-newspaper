import { formatDateTime } from '@/lib/format';
import type { LogEntry } from '@/lib/schemas';

// Corrections are never edited away silently: each one stays visible with its time.
export default function CorrectionNotice({
    corrections,
}: {
    corrections: LogEntry[];
}) {
    if (corrections.length === 0) return null;
    return (
        <section
            id="corrections"
            aria-labelledby="corrections-title"
            className="scroll-mt-24 border-l-4 border-alert bg-sand p-4 font-ui"
        >
            <h2
                id="corrections-title"
                className="font-serif text-xl font-bold text-ink"
            >
                সংশোধনী
            </h2>
            <ul className="mt-3 space-y-4">
                {corrections.map((c, i) => (
                    <li key={i}>
                        <time
                            dateTime={c.at}
                            className="block text-sm text-muted"
                        >
                            {formatDateTime(c.at)}
                        </time>
                        <p className="mt-1 font-serif leading-[1.8] text-ink">
                            {c.text}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
