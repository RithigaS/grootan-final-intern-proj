// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from "next/server";

export async function GET() {
    try {
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

        const text = await response.text();

        console.log("ERPNext status:", response.status);
        console.log("ERPNext response:", text.slice(0, 500));

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: "ERPNext API failed",
                    status: response.status,
                    response: text.slice(0, 500),
                },
                { status: response.status }
            );
        }

        const data = JSON.parse(text);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to fetch recommendations",
                details: String(error),
            },
            { status: 500 }
        );
    }
}