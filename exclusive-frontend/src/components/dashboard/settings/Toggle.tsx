const Toggle = ({ value, onChange, label, description }: { value: boolean; onChange: (v: boolean) => void; label: string; description?: string; }) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
                {description && (
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                )}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer shrink-0 ${value ? "bg-primary" : "bg-gray-200 dark:bg-slate-600"}`}>
                <span className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-4.5" : "translate-x-0.5"}`} />
            </button>
        </div>
    );
}

export default Toggle