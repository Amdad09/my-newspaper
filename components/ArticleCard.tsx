import Image from 'next/image';
import Link from 'next/link';
import { getCategory } from '@/data/categories';
import { KIND_LABEL } from '@/lib/format';
import type { Article } from '@/lib/schemas';
import MetaLine from './MetaLine';
import VerificationBadge from './VerificationBadge';

type Variant = 'lead' | 'medium' | 'list';

type Props = {
    article: Article;
    variant?: Variant;
    /** true for the first image on the page (improves LCP) */
    priority?: boolean;
};

const TITLE: Record<Variant, string> = {
    lead: 'text-3xl leading-tight sm:text-4xl',
    medium: 'text-xl leading-snug',
    list: 'text-lg leading-snug',
};

const SIZES: Record<Variant, string> = {
    lead: '(min-width: 1024px) 720px, 100vw',
    medium: '(min-width: 1024px) 360px, 50vw',
    list: '176px',
};

export default function ArticleCard({
    article,
    variant = 'medium',
    priority = false,
}: Props) {
    const category = getCategory(article.category)?.label;
    const isList = variant === 'list';
    // "verified" is shown on the article page; on cards only flag what needs caution
    const needsBadge =
        article.verification === 'in_review' ||
        article.verification === 'unverified';

    return (
        <article
            className={`group relative has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-navy ${
                isList
                    ? 'flex flex-row-reverse items-start gap-4'
                    : 'flex flex-col gap-3'
            }`}
        >
            <div
                className={`relative overflow-hidden bg-sand ${
                    variant === 'lead' ? 'aspect-video' : 'aspect-4/3'
                } ${isList ? 'w-28 shrink-0 sm:w-44' : 'w-full'}`}
            >
                <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    priority={priority}
                    sizes={SIZES[variant]}
                    className="object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-ui text-sm">
                    {category && (
                        <span className="font-semibold text-navy">
                            {category}
                        </span>
                    )}
                    {article.kind !== 'news' && (
                        <span className="text-muted">
                            {KIND_LABEL[article.kind]}
                        </span>
                    )}
                    {needsBadge && (
                        <VerificationBadge status={article.verification} />
                    )}
                </div>

                <h3
                    className={`font-serif font-bold text-ink ${TITLE[variant]}`}
                >
                    {/* stretched link: the ::after covers the whole card, so the card is
              clickable but screen readers still hear one clean link */}
                    <Link
                        href={`/news/${article.slug}`}
                        className="decoration-1 underline-offset-4 outline-none after:absolute after:inset-0 group-hover:underline"
                    >
                        {article.title}
                    </Link>
                </h3>

                {!isList && (
                    <p className="mt-2 font-serif leading-[1.75] text-ink/80">
                        {article.summary}
                    </p>
                )}

                <MetaLine
                    article={article}
                    showSource={variant === 'lead'}
                    className="mt-3"
                />
            </div>
        </article>
    );
}
