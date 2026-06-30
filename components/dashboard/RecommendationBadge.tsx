type Props = {
    value: string;
};

export default function RecommendationBadge({ value }: Props) {
    const styles: Record<string, string> = {
        "BUY NOW": "bg-green-100 text-green-700",
        WAIT: "bg-yellow-100 text-yellow-700",
        "SPLIT ORDER": "bg-blue-100 text-blue-700",
        "DELAY PURCHASE": "bg-red-100 text-red-700",
        MONITOR: "bg-purple-100 text-purple-700",
    };

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[value] || "bg-slate-100 text-slate-700"}`}>
            {value}
        </span>
    );
}