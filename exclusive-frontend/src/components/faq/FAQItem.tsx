import { ChevronDown } from "lucide-react";
import type { FAQItemProps } from "../../types/components";

const FAQItem = ({ question, answer }: FAQItemProps) => {
    return (
        <details className="group bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-300 overflow-hidden">
            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors">
                <span>{question}</span>
                <ChevronDown className="group-open:rotate-180 text-primary transition-transform" />
            </summary>

            <div className="p-6 pt-0 text-gray-700 dark:text-gray-300 leading-relaxed">
                {answer}
            </div>
        </details>
    );
};

export default FAQItem;