"use client";

export default function RefreshButton() {
    return (
        <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
            Refresh
        </button>
    );
}