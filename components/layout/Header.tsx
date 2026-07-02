import HeaderStats from "@/components/dashboard/HeaderStats";
import RefreshButton from "@/components/dashboard/RefreshButton";

type Props = {
    totalMaterials: number;
};

export default function Header({ totalMaterials }: Props) {
    return (
        <header className="bg-slate-900 text-white shadow">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-8 py-6 md:flex-row md:items-start md:justify-between">

                {/* Left */}
                <div>
                    <h1 className="text-3xl font-bold">
                        AI Procurement Intelligence Platform
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Real-time procurement recommendations powered by ERPNext and AI.
                    </p>

                    <HeaderStats totalMaterials={totalMaterials} />
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-3">
                    <a
                        href="https://insights.apps.grootan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        View Analytics Dashboard
                    </a>

                    <RefreshButton />
                </div>

            </div>
        </header>
    );
}