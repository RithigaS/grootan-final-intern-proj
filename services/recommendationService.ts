import { Recommendation } from "@/types/recommendation";

export async function getRecommendations(): Promise<Recommendation[]> {
    const res = await fetch("process.env.NEXT_PUBLIC_APP_URL/api/recommendations", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch recommendations");
    }

    const json = await res.json();
    return json.data || [];
}