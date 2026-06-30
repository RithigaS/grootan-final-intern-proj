export type Recommendation = {
    name: string;
    item: string;
    recommendation: string;
    risk_level: string;
    recommended_supplier: string;
    recommended_quantity_mt: number;
    stock_coverage_days: number;
    confidence_score: number;
    status: string;
    reason: string;
    suggested_action: string;
};