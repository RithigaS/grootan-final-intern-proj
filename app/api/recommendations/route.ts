import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_ERPNEXT_URL;
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;

    const fields = encodeURIComponent(
        JSON.stringify([
            "name",
            "item",
            "recommendation",
            "risk_level",
            "recommended_supplier",
            "recommended_quantity_mt",
            "stock_coverage_days",
            "confidence_score",
            "status",
            "reason",
            "suggested_action",
        ])
    );

    const url = `${baseUrl}/api/resource/AI%20Procurement%20Recommendation?fields=${fields}&limit_page_length=100&order_by=modified%20desc`;

    const response = await fetch(url, {
        headers: {
            Authorization: `token ${apiKey}:${apiSecret}`,
            Accept: "application/json",
        },
        cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data);
}