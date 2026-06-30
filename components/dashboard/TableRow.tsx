import Link from "next/link";
import { Recommendation } from "@/types/recommendation";
import RecommendationBadge from "./RecommendationBadge";
import RiskBadge from "./RiskBadge";

type Props = {
    recommendation: Recommendation;
};

export default function TableRow({ recommendation }: Props) {
    return (
        <tr className="border-b border-slate-100 hover:bg-slate-50">
            <td className="p-4 font-medium text-slate-900">{recommendation.item}</td>

            <td className="p-4">
                <RecommendationBadge value={recommendation.recommendation} />
            </td>

            <td className="p-4">
                <RiskBadge value={recommendation.risk_level} />
            </td>

            <td className="p-4 text-slate-700">
                {recommendation.recommended_supplier}
            </td>

            <td className="p-4 text-slate-700">
                {recommendation.recommended_quantity_mt}
            </td>

            <td className="p-4 text-slate-700">
                {recommendation.confidence_score}%
            </td>

            <td className="p-4">
                <Link
                    href={`/recommendations/${recommendation.name}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                    View
                </Link>
            </td>
        </tr>
    );
}