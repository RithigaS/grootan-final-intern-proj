type Props = {
    value: string;
};

export default function RiskBadge({ value }: Props) {
    const styles: Record<string, string> = {
        HIGH: "bg-red-100 text-red-700",
        MEDIUM: "bg-orange-100 text-orange-700",
        LOW: "bg-green-100 text-green-700",
    };

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[value] || "bg-slate-100 text-slate-700"}`}>
            {value}
        </span>
    );
}