// While the site only has dummy data, keep list pages out of search engines.
// Set NEXT_PUBLIC_SITE_IS_LIVE=true in production once real articles are in.
export const robotsWhileDummy =
    process.env.NEXT_PUBLIC_SITE_IS_LIVE === 'true'
        ? undefined
        : ({ index: false, follow: false } as const);
