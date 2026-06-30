"use client";

import { useMemo, useState } from "react";
import { Recommendation } from "@/types/recommendation";
import RecommendationTable from "./RecommendationTable";
import EmptyState from "@/components/common/EmptyState";

type Props = {
    recommendations: Recommendation[];
};

export default function RecommendationDashboard({ recommendations }: Props) {
    const [search, setSearch] = useState("");
    const [recommendationFilter, setRecommendationFilter] = useState("ALL");
    const [riskFilter, setRiskFilter] = useState("ALL");

    const filteredRecommendations = useMemo(() => {
        return recommendations.filter((rec) => {
            const matchesSearch = rec.item
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesRecommendation =
                recommendationFilter === "ALL" ||
                rec.recommendation === recommendationFilter;

            const matchesRisk =
                riskFilter === "ALL" || rec.risk_level === riskFilter;

            return matchesSearch && matchesRecommendation && matchesRisk;
        });
    }, [recommendations, search, recommendationFilter, riskFilter]);

    return (
        <div className="mt-8">
            <div className="rounded-xl bg-white p-5 shadow">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <input
                        type="text"
                        placeholder="Search material..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />

                    <select
                        value={recommendationFilter}
                        onChange={(e) => setRecommendationFilter(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="ALL">All Recommendations</option>
                        <option value="BUY NOW">BUY NOW</option>
                        <option value="WAIT">WAIT</option>
                        <option value="SPLIT ORDER">SPLIT ORDER</option>
                        <option value="DELAY PURCHASE">DELAY PURCHASE</option>
                        <option value="MONITOR">MONITOR</option>
                    </select>

                    <select
                        value={riskFilter}
                        onChange={(e) => setRiskFilter(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="ALL">All Risk Levels</option>
                        <option value="HIGH">HIGH</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LOW">LOW</option>
                    </select>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                    Showing {filteredRecommendations.length} of {recommendations.length} recommendations
                </p>
            </div>

            {filteredRecommendations.length > 0 ? (
                <RecommendationTable recommendations={filteredRecommendations} />
            ) : (
                <EmptyState
                    title="No recommendations found"
                    message="Try changing the search keyword or filter values."
                />
            )}
        </div>
    );
}