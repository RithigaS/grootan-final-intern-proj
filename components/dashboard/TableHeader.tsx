type Props = {
    sortKey: string;
    sortDirection: "asc" | "desc";
    onSort: (key: string) => void;
};

const columns = [
    { key: "item", label: "Item" },
    { key: "recommendation", label: "Recommendation" },
    { key: "risk_level", label: "Risk" },
    { key: "recommended_supplier", label: "Supplier" },
    { key: "recommended_quantity_mt", label: "Qty MT" },
    { key: "confidence_score", label: "Confidence" },
];

export default function TableHeader({ sortKey, sortDirection, onSort }: Props) {
    return (
        <thead className="sticky top-0 bg-slate-900 text-white">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key}
                        onClick={() => onSort(column.key)}
                        className="cursor-pointer p-4 text-left text-sm font-semibold"
                    >
                        {column.label}
                        {sortKey === column.key && (
                            <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                    </th>
                ))}
                <th className="p-4 text-left text-sm font-semibold">Action</th>
            </tr>
        </thead>
    );
}