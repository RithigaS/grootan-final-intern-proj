type Props = {
    totalMaterials: number;
};

export default function HeaderStats({ totalMaterials }: Props) {
    const lastUpdated = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
            <span>Last Updated: {lastUpdated}</span>
            <span>Total Materials: {totalMaterials}</span>
            <span>Source: ERPNext</span>
        </div>
    );
}