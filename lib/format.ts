const TZ = 'Asia/Dhaka';
const WORDS_PER_MINUTE = 160; // rough Bangla reading speed; tune later

const bnNumber = new Intl.NumberFormat('bn-BD', { useGrouping: false });
const bnDate = new Intl.DateTimeFormat('bn-BD', {
    timeZone: TZ,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});
const hourMinute = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
});

export const toBn = (n: number) => bnNumber.format(n);

function dayPeriod(h: number) {
    if (h < 4) return 'রাত';
    if (h < 6) return 'ভোর';
    if (h < 12) return 'সকাল';
    if (h < 15) return 'দুপুর';
    if (h < 18) return 'বিকাল';
    if (h < 20) return 'সন্ধ্যা';
    return 'রাত';
}

/** "৩ অক্টোবর, ২০২৬" */
export function formatDate(iso: string) {
    return bnDate.format(new Date(iso));
}

/** "রাত ১০:৩০" (Asia/Dhaka) */
export function formatTime(iso: string) {
    const parts = hourMinute.formatToParts(new Date(iso));
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
    const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    const h12 = h % 12 || 12;
    return `${dayPeriod(h)} ${toBn(h12)}:${m < 10 ? '০' : ''}${toBn(m)}`;
}

/** "৩ অক্টোবর, ২০২৬, রাত ১০:৩০" */
export function formatDateTime(iso: string) {
    return `${formatDate(iso)}, ${formatTime(iso)}`;
}

/** "২ ঘণ্টা আগে". Falls back to the full date after 7 days. */
export function formatRelative(iso: string, now: Date = new Date()) {
    const sec = Math.floor((now.getTime() - new Date(iso).getTime()) / 1000);
    if (sec < 60) return 'এইমাত্র';
    const min = Math.floor(sec / 60);
    if (min < 60) return `${toBn(min)} মিনিট আগে`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${toBn(hr)} ঘণ্টা আগে`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${toBn(day)} দিন আগে`;
    return formatDate(iso);
}

/** Estimated minutes to read (at least 1). Computed, never stored. */
export function readingMinutes(paragraphs: string[]) {
    const words = paragraphs
        .join(' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** "৩ মিনিটের পাঠ" */
export function formatReadingTime(paragraphs: string[]) {
    return `${toBn(readingMinutes(paragraphs))} মিনিটের পাঠ`;
}

export const VERIFICATION_LABEL = {
    verified: 'যাচাইকৃত',
    in_review: 'যাচাই চলছে',
    unverified: 'অযাচাইকৃত দাবি',
    not_applicable: '',
} as const;

export const KIND_LABEL = {
    news: 'সংবাদ',
    analysis: 'বিশ্লেষণ',
    opinion: 'মতামত',
    fact_check: 'ফ্যাক্ট-চেক',
} as const;

export const SOURCE_TYPE_LABEL = {
    official: 'সরকারি/প্রাতিষ্ঠানিক',
    document: 'নথি',
    interview: 'সাক্ষাৎকার',
    witness: 'প্রত্যক্ষদর্শী',
    secondary: 'অন্য প্রকাশিত সূত্র',
} as const;
