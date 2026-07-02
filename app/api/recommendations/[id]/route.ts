process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_ERPNEXT_URL;
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;

    const response = await fetch(
        `${baseUrl}/api/resource/AI%20Procurement%20Recommendation/${id}`,
        {
            headers: {
                Authorization: `token ${apiKey}:${apiSecret}`,
                Accept: "application/json",
            },
            cache: "no-store",
        }
    );

    const data = await response.json();

    return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: Props) {
    const { id } = await params;
    const body = await request.json();

    console.log("Updating Recommendation:", id);
    console.log("Request Body:", body);

    const baseUrl = process.env.NEXT_PUBLIC_ERPNEXT_URL;
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;

    try {
        const response = await fetch(
            `${baseUrl}/api/resource/AI%20Procurement%20Recommendation/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `token ${apiKey}:${apiSecret}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();

        console.log("ERPNext Status:", response.status);
        console.log("ERPNext Response:", data);

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to connect to ERPNext",
            },
            {
                status: 500,
            }
        );
    }
}