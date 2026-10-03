import { VERIFICATION_LABEL } from '@/lib/format';
import type { Article } from '@/lib/schemas';

// Status is shown by icon + text, never by color alone.
const STYLE = {
    verified: { color: 'text-verified', path: 'M5 12.5l4.5 4.5L19 7.5' },
    in_review: { color: 'text-caution', path: 'M12 7v5l3 2' },
    unverified: { color: 'text-alert', path: 'M12 7v6M12 17h.01' },
} as const;

export default function VerificationBadge({
    status,
}: {
    status: Article['verification'];
}) {
    if (status === 'not_applicable') return null;
    const s = STYLE[status];
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-ui text-xs font-medium ring-1 ring-current/30 ${s.color}`}
        >
            <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d={s.path} />
            </svg>
            {VERIFICATION_LABEL[status]}
        </span>
    );
}
