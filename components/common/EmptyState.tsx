type Props = {
    title: string;
    message: string;
};

export default function EmptyState({ title, message }: Props) {
    return (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{message}</p>
        </div>
    );
}