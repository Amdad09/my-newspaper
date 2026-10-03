import type { Metadata } from 'next';
import StaticPage, { Section } from '@/components/StaticPage';
import { robotsWhileDummy } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'আমাদের সম্পর্কে',
    robots: robotsWhileDummy,
};

export default function AboutPage() {
    return (
        <StaticPage title="আমাদের সম্পর্কে">
            <Section title="আমরা কারা">
                <p>[আপনার পরিচয় বা দলের পরিচয় এখানে লিখুন।]</p>
            </Section>

            <Section title="আমাদের লক্ষ্য">
                <p>
                    বাংলাদেশের খবর উৎস, প্রমাণ ও সংশোধনীসহ তুলে ধরা, যাতে পাঠক
                    নিজেই যাচাই করে নিতে পারেন কোন তথ্য কোথা থেকে এসেছে।
                </p>
            </Section>

            <Section title="মালিকানা ও অর্থায়ন">
                <p>
                    [এই পোর্টালের মালিক কে এবং খরচ কোথা থেকে আসে, তা এখানে
                    খোলাখুলি লিখুন।]
                </p>
            </Section>
        </StaticPage>
    );
}
