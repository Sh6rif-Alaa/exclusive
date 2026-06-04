import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ScrollButtonsProps } from "../../types/components";

const ScrollButtons = ({ prevClass, nextClass, }: ScrollButtonsProps) => {
    return (
        <div className="flex gap-2 self-end md:self-auto [&_button]:w-11 [&_button]:h-11 [&_button]:rounded-full [&_button]:bg-gray-100 [&_button]:dark:bg-gray-700 [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:cursor-pointer [&_button]:hover:bg-gray-200 [&_button]:dark:hover:bg-gray-600 [&_button]:transition-colors">
            <button className={prevClass}>
                <ArrowLeft />
            </button>

            <button className={nextClass}>
                <ArrowRight />
            </button>
        </div>
    );
};

export default ScrollButtons;