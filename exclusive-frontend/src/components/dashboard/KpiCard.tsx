import { TrendingDown, TrendingUp } from "lucide-react";
import type { KpiCardProps } from "../../types/dashboard.type";

const KpiCard = ({ label, value, change, icon: Icon, accent, suffix }: KpiCardProps) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {label}
                </span>
                <div className={`size-9 rounded-lg flex items-center justify-center ${accent}`}>
                    <Icon size={18} className="text-primary" />
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
                {suffix && <span className="text-sm font-normal text-gray-400 ml-1">{suffix}</span>}
            </p>
            {change && (
                <p className={`text-xs font-medium flex items-center gap-1 ${change.positive ? "text-emerald-500" : "text-red-500"}`}>
                    {change.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {change.positive ? "+" : "-"}{change.value}%{" "}
                    <span className="text-gray-400 font-normal">vs last month</span>
                </p>
            )}
        </div>
    );
}

export default KpiCard;