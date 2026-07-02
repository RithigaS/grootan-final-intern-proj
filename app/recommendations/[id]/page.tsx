import Link from "next/link";
import RecommendationBadge from "@/components/dashboard/RecommendationBadge";
import RiskBadge from "@/components/dashboard/RiskBadge";
import StatusUpdater from "@/components/dashboard/StatusUpater";

type Props = {
    params: Promise<{ id: string }>;
};

async function getRecommendation(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/recommendations/${id}`, {
        cache: "no-store",
    });

    const json = await res.json();
    return json.data || null;
}

export default async function RecommendationDetails({ params }: Props) {
    const { id } = await params;
    const recommendation = await getRecommendation(id);

    if (!recommendation) {
        return (
            <main className="min-h-screen bg-slate-100 p-8">
                <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Recommendation not found
                    </h1>

                    <p className="mt-2 text-slate-600">
                        This recommendation may have been deleted or replaced in ERPNext.
                    </p>

                    <Link
                        href="/"
                        className="mt-5 inline-block font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100">
            <header className="bg-slate-900 text-white shadow">
                <div className="mx-auto max-w-6xl px-8 py-6">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-blue-300 hover:text-white"
                    >
                        ← Back to Dashboard
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold">
                        {recommendation.item}
                    </h1>

                    <p className="mt-2 text-slate-300">
                        AI Procurement Recommendation Details
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-6xl p-8">
                <div className="rounded-xl bg-white p-8 shadow">

                    {/* Header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Recommendation ID
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {recommendation.name}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <RecommendationBadge
                                value={recommendation.recommendation}
                            />

                            <RiskBadge
                                value={recommendation.risk_level}
                            />
                        </div>
                    </div>

                    {/* Information Cards */}
                    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

                        <InfoCard
                            label="Supplier"
                            value={recommendation.recommended_supplier}
                        />

                        <InfoCard
                            label="Quantity"
                            value={`${recommendation.recommended_quantity_mt} MT`}
                        />

                        <InfoCard
                            label="Stock Coverage"
                            value={`${recommendation.stock_coverage_days} Days`}
                        />

                        <InfoCard
                            label="Confidence"
                            value={`${recommendation.confidence_score}%`}
                        />

                        <InfoCard
                            label="Status"
                            value={recommendation.status}
                        />

                        <InfoCard
                            label="Risk Level"
                            value={recommendation.risk_level}
                        />

                    </div>

                    {/* NEW STATUS UPDATER */}
                    <StatusUpdater
                        recommendationId={recommendation.name}
                        currentStatus={recommendation.status}
                    />

                    {/* AI Reason */}

                    <Section
                        title="AI Reason"
                        content={recommendation.reason}
                    />

                    {/* Suggested Action */}

                    <Section
                        title="Suggested Procurement Action"
                        content={recommendation.suggested_action}
                    />

                </div>
            </section>
        </main>
    );
}

function InfoCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
                {label}
            </p>

            <p className="mt-2 font-bold text-slate-900">
                {value}
            </p>
        </div>
    );
}

function Section({
    title,
    content,
}: {
    title: string;
    content: string;
}) {
    return (
        <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
                {title}
            </h2>

            <p className="mt-3 whitespace-pre-line rounded-xl bg-slate-50 p-5 leading-8 text-slate-700">
                {content || "No details available."}
            </p>
        </section>
    );
}