
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BreadcrumbProps } from "../../types/components";

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="my-8">
            <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.label} className="flex items-center gap-2">
                            {isLast ? (
                                <span
                                    className="text-primary font-medium transition-colors"
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        to={item.href || "#"}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>

                                    <ChevronRight size={14} />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}