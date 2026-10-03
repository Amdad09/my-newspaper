import raw from '@/data/articles.json';
import { articleListSchema, type Article } from './schemas';
import type { CategorySlug } from '@/data/categories';

// Validate once at module load. A bad record fails the build with a clear
// message instead of crashing a page at runtime.
const all: Article[] = articleListSchema
    .parse(raw)
    .filter((a) => a.status === 'published')
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

const slugs = new Set<string>();
for (const a of all) {
    if (slugs.has(a.slug)) throw new Error(`Duplicate slug: ${a.slug}`);
    slugs.add(a.slug);
}

// Every function is async on purpose. Today it reads JSON; later it can call an
// API or database and no page or component has to change.

type ListOptions = {
    category?: CategorySlug;
    kind?: Article['kind'];
    limit?: number;
    offset?: number;
};

function filterBy({ category, kind }: ListOptions) {
    return all.filter(
        (a) =>
            (!category || a.category === category) &&
            (!kind || a.kind === kind),
    );
}

export async function getArticles(opts: ListOptions = {}) {
    const { limit, offset = 0 } = opts;
    const list = filterBy(opts).slice(offset);
    return limit ? list.slice(0, limit) : list;
}

export async function countArticles(opts: ListOptions = {}) {
    return filterBy(opts).length;
}

export async function getArticleBySlug(slug: string) {
    return all.find((a) => a.slug === slug) ?? null;
}

export async function getFeatured(limit = 3) {
    return all.filter((a) => a.featured).slice(0, limit);
}

export async function getBreaking() {
    return all.find((a) => a.breaking) ?? null;
}

/** Same category first, then shared tags. Never returns the article itself. */
export async function getRelated(article: Article, limit = 3) {
    const score = (a: Article) =>
        (a.category === article.category ? 2 : 0) +
        a.tags.filter((t) => article.tags.includes(t)).length;
    return all
        .filter((a) => a.id !== article.id)
        .map((a) => ({ a, s: score(a) }))
        .filter(({ s }) => s > 0)
        .sort((x, y) => y.s - x.s)
        .slice(0, limit)
        .map(({ a }) => a);
}

export async function getByTag(tag: string) {
    return all.filter((a) => a.tags.includes(tag));
}

/** Simple substring search over title, summary and tags. Good enough for JSON. */
export async function searchArticles(query: string) {
    const q = query.normalize('NFC').trim().toLowerCase();
    if (!q) return [];
    return all.filter((a) =>
        [a.title, a.summary, ...a.tags].some((s) =>
            s.normalize('NFC').toLowerCase().includes(q),
        ),
    );
}
