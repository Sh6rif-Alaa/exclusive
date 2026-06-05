const NumberInput = ({ value, onChange, min, step, prefix }: { value: number; onChange: (v: number) => void; min?: number; step?: number; prefix?: string; }) => {
    return (
        <div className="relative">
            {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {prefix}
                </span>
            )}
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                min={min}
                step={step}
                className={`w-full ${prefix ? "pl-7" : "px-3"} pr-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 number-spinner-hide`}
            />
        </div>
    );
}

export default NumberInput