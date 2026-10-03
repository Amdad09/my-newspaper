// Remove this (and its use in layout.tsx) when real data replaces the fake JSON.
export default function DummyNotice() {
    return (
        <div
            role="note"
            className="border-b border-line bg-sand px-4 py-2 text-center font-ui text-sm text-muted"
        >
            এই সাইটের সব খবর পরীক্ষামূলক ডামি ডেটা, বাস্তব ঘটনা নয়।
        </div>
    );
}
