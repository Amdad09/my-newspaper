// Single source of truth for categories.
// Navbar, category pages, the Zod schema and the JSON data all read from here.
export const CATEGORIES = [
    { slug: 'bangladesh', label: 'বাংলাদেশ', primary: true },
    { slug: 'politics', label: 'রাজনীতি', primary: true },
    { slug: 'economy', label: 'অর্থনীতি', primary: true },
    { slug: 'world', label: 'বিশ্ব', primary: true },
    { slug: 'technology', label: 'প্রযুক্তি', primary: true },
    { slug: 'sports', label: 'খেলা', primary: true },
    { slug: 'investigation', label: 'অনুসন্ধান', primary: true },
    { slug: 'education', label: 'শিক্ষা', primary: false },
    { slug: 'health', label: 'স্বাস্থ্য', primary: false },
    { slug: 'society', label: 'সমাজ', primary: false },
    { slug: 'opinion', label: 'মতামত', primary: false },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

// z.enum() needs a non-empty tuple type
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [
    CategorySlug,
    ...CategorySlug[],
];

export function getCategory(slug: string) {
    return CATEGORIES.find((c) => c.slug === slug);
}
