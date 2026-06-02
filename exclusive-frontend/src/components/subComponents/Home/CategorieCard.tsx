import { Link } from "react-router-dom"


interface CategorieCardProps {
    title: string;
    icon: React.ReactNode;
}

const CategorieCard = ({ title, icon }: CategorieCardProps) => {
    return (
        <div
            className="lg:col-span-2 md:col-span-4 col-span-6 group border border-gray-300 dark:border-gray-600 rounded-md hover:bg-primary hover:border-primary transition-colors duration-300">
            <Link to={`./shop?category=${title}`} className="flex flex-col items-center justify-center py-8 gap-4 cursor-pointer">
                {icon}
                <p className="font-medium group-hover:text-white transition-colors duration-300">{title}</p>
            </Link>
        </div>
    )
}

export default CategorieCard