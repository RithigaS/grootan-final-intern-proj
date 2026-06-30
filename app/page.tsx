import Header from "@/components/layout/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RecommendationDashboard from "@/components/dashboard/RecommendationDashboard";
import { getRecommendations } from "@/services/recommendationService";

export default async function Home() {
  const recommendations = await getRecommendations();

  return (
    <main className="min-h-screen bg-slate-100">
      <Header totalMaterials={recommendations.length} />

      <section className="mx-auto max-w-7xl p-8">
        <SummaryCards recommendations={recommendations} />
        <RecommendationDashboard recommendations={recommendations} />
      </section>
    </main>
  );
}