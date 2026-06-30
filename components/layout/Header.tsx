import HeaderStats from "@/components/dashboard/HeaderStats";
import RefreshButton from "@/components/dashboard/RefreshButton";

type Props = {
    totalMaterials: number;
};

export default function Header({ totalMaterials }: Props) {
    return (
        <header className="bg-slate-900 text-white shadow">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-8 py-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        AI Procurement Intelligence Platform
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Real-time procurement recommendations powered by ERPNext and AI.
                    </p>

                    <HeaderStats totalMaterials={totalMaterials} />
                </div>

                <RefreshButton />
                <a
                    href="https://insights.apps.grootan.com/insights/dashboard/5/?native_filters_key=2wxwy4jtuOM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition"
                >
                    Analytics Dashboard
                </a>
            </div>
        </header>
    );
}