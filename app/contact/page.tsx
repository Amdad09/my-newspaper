import type { Metadata } from 'next';
import Link from 'next/link';
import StaticPage, { Section } from '@/components/StaticPage';
import { robotsWhileDummy } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'যোগাযোগ',
    robots: robotsWhileDummy,
};

export default function ContactPage() {
    return (
        <StaticPage title="যোগাযোগ">
            <Section title="সাধারণ যোগাযোগ">
                <p>[ইমেইল ঠিকানা এখানে দিন।]</p>
            </Section>

            <Section title="ভুল জানাতে">
                <p>
                    কোনো খবরে ভুল দেখলে{' '}
                    <Link
                        href="/corrections"
                        className="text-navy underline underline-offset-4"
                    >
                        সংশোধনী নীতি
                    </Link>{' '}
                    পাতায় দেখুন।
                </p>
            </Section>

            <Section title="তথ্য পাঠাতে চাইলে">
                <p>
                    [তথ্য পাঠানোর মাধ্যম ও সূত্রের নিরাপত্তা নিয়ে আপনার নীতি
                    এখানে লিখুন। নিরাপদ মাধ্যম চালু না হওয়া পর্যন্ত সংবেদনশীল
                    তথ্য পাঠাতে বলবেন না।]
                </p>
            </Section>
        </StaticPage>
    );
}
