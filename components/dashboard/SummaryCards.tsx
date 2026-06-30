import { Recommendation } from "@/types/recommendation";

type Props = {
    recommendations: Recommendation[];
};

export default function SummaryCards({ recommendations }: Props) {
    const total = recommendations.length;
    const buyNow = recommendations.filter((r) => r.recommendation === "BUY NOW").length;
    const wait = recommendations.filter((r) => r.recommendation === "WAIT").length;
    const splitOrder = recommendations.filter((r) => r.recommendation === "SPLIT ORDER").length;
    const highRisk = recommendations.filter((r) => r.risk_level === "HIGH").length;

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            <Card label="Total" value={total} />
            <Card label="BUY NOW" value={buyNow} />
            <Card label="WAIT" value={wait} />
            <Card label="SPLIT ORDER" value={splitOrder} />
            <Card label="HIGH RISK" value={highRisk} />
        </div>
    );
}

function Card({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>
        </div>
    );
}