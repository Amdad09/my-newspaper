import Link from 'next/link';

type Props = { title: string; href?: string };

export default function SectionHeader({ title, href }: Props) {
    return (
        <div className="mb-5 flex items-baseline justify-between border-t-2 border-navy pt-3">
            <h2 className="font-serif text-2xl font-bold text-ink">{title}</h2>
            {href && (
                <Link
                    href={href}
                    className="font-ui text-sm text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                    সব দেখুন
                </Link>
            )}
        </div>
    );
}
