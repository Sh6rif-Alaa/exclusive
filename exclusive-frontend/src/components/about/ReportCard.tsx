import type { ReportCardProps } from "../../types/components";

const ReportCard = ({ title, icon: Icon, count }: ReportCardProps) => {
    return (
        <div
            className="group border border-gray-200 dark:bg-slate-800 dark:border-dark-black p-8 rounded-sm text-center hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div
                className="bg-black dark:bg-dark-input group-hover:bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-8 border-gray-300 dark:border-dark-black group-hover:border-white/30 transition-all duration-300">
                <Icon className="text-2xl text-white group-hover:text-black transition-all duration-300" />
            </div>
            <h2
                className="text-3xl font-bold text-black dark:text-white group-hover:text-white transition-all duration-300">
                {count}</h2>
            <p
                className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white transition-all duration-300">
                {title}</p>
        </div>
    )
};


export default ReportCard;