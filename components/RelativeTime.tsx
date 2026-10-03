/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { formatDate, formatDateTime, formatRelative } from '@/lib/format';

/**
 * Starts with a fixed date string so the server HTML and the first browser
 * render match (no hydration warning), then switches to "২ ঘণ্টা আগে".
 */
export default function RelativeTime({ iso }: { iso: string }) {
    const [text, setText] = useState(() => formatDate(iso));
    useEffect(() => setText(formatRelative(iso)), [iso]);
    return (
        <time dateTime={iso} title={formatDateTime(iso)}>
            {text}
        </time>
    );
}
