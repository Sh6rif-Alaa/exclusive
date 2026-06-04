import { Check } from "lucide-react";
import type { TrackStepProps } from "../../types/account.type";

const TrackStep = ({ step, isLast }: TrackStepProps) => {
    return (
        <div className="flex gap-4">
            {/* Circle + connector line */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${step.completed
                        ? "bg-primary border-primary text-white"
                        : step.current
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                        }`}>
                    {step.completed ? (
                        <Check size={18} strokeWidth={3} />
                    ) : (
                        <span className="text-sm font-bold">{step.id}</span>
                    )}
                </div>
                {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-10 mt-1 ${step.completed ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`} />
                )}
            </div>

            {/* Step content */}
            <div className="pb-8 pt-1.5">
                <p className={`font-semibold text-sm ${step.completed
                    ? "text-primary"
                    : step.current
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                    {step.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{step.description}</p>
                {step.date && <p className="text-xs text-gray-400 mt-1">{step.date}</p>}
            </div>
        </div>
    );
};

export default TrackStep;
