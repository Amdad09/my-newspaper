type Props = { title: string; description?: string };

export default function PageHeading({ title, description }: Props) {
    return (
        <header className="mb-8 border-t-2 border-navy pt-4">
            <h1 className="font-serif text-4xl font-bold leading-tight text-ink">
                {title}
            </h1>
            {description && (
                <p className="mt-2 font-ui text-muted">{description}</p>
            )}
        </header>
    );
}
