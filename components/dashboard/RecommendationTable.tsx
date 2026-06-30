"use client";

import { useEffect, useMemo, useState } from "react";
import { Recommendation } from "@/types/recommendation";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

type Props = {
    recommendations: Recommendation[];
};

const ITEMS_PER_PAGE = 10;

export default function RecommendationTable({ recommendations }: Props) {
    const [sortKey, setSortKey] = useState("confidence_score");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);

    const sortedRecommendations = useMemo(() => {
        return [...recommendations].sort((a, b) => {
            const aValue = a[sortKey as keyof Recommendation];
            const bValue = b[sortKey as keyof Recommendation];

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
            }

            return sortDirection === "asc"
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }, [recommendations, sortKey, sortDirection]);

    const totalPages = Math.max(
        1,
        Math.ceil(sortedRecommendations.length / ITEMS_PER_PAGE)
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    function handleSort(key: string) {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }

        setCurrentPage(1);
    }

    function handlePageChange(page: number) {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    }

    const paginatedRecommendations = sortedRecommendations.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
            <div className="max-h-[620px] overflow-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <TableHeader
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                    />

                    <tbody>
                        {paginatedRecommendations.map((rec) => (
                            <TableRow key={rec.name} recommendation={rec} />
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}