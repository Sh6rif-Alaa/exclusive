import type { SectionHeaderProps } from "../../types/components";

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
    return (
        <div className="space-y-6">
            <div
                className="flex items-center gap-4 before:w-5 before:h-10 before:bg-primary before:rounded-sm before:block">
                <p className="text-primary font-semibold">{title}</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold font-inter tracking-wider">{subtitle}</h2>
        </div>
    );
}

export default SectionHeader;