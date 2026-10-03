// While the site only has dummy data, keep pages out of search engines and show
// "draft" notices. Set NEXT_PUBLIC_SITE_IS_LIVE=true in production once real
// articles and real policy text are in.
export const isLive = process.env.NEXT_PUBLIC_SITE_IS_LIVE === 'true';

export const robotsWhileDummy = isLive
    ? undefined
    : ({ index: false, follow: false } as const);
