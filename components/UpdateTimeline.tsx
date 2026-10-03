import { formatDateTime } from '@/lib/format';
import type { LogEntry } from '@/lib/schemas';

// For developing stories: oldest first, so the story reads in the order it unfolded.
export default function UpdateTimeline({ updates }: { updates: LogEntry[] }) {
    if (updates.length === 0) return null;
    const ordered = [...updates].sort(
        (a, b) => +new Date(a.at) - +new Date(b.at),
    );
    return (
        <section aria-labelledby="updates-title" className="font-ui">
            <h2
                id="updates-title"
                className="font-serif text-xl font-bold text-ink"
            >
                ঘটনার আপডেট
            </h2>
            <ol className="mt-3 space-y-3 border-l border-line pl-4">
                {ordered.map((u, i) => (
                    <li key={i}>
                        <time
                            dateTime={u.at}
                            className="block text-sm text-muted"
                        >
                            {formatDateTime(u.at)}
                        </time>
                        <p className="text-ink">{u.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
