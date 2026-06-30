"use client";

import { useState } from "react";

type Props = {
    recommendationId: string;
    currentStatus: string;
};

const statuses = ["Open", "Under Review", "Approved", "Completed", "Rejected"];

export default function StatusUpdater({
    recommendationId,
    currentStatus,
}: Props) {
    const [status, setStatus] = useState(currentStatus || "Open");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function updateStatus() {
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`/api/recommendations/${recommendationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            setMessage("Status updated successfully");
        } catch {
            setMessage("Unable to update status");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Update Status</p>

            <div className="mt-3 flex flex-col gap-3 md:flex-row">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900"
                >
                    {statuses.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={updateStatus}
                    disabled={loading}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>

            {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
        </div>
    );
}