import { Link } from "react-router-dom"
import type { CategorieCardProps } from "../../types/components"

const CategorieCard = ({ name, icon: Icon }: CategorieCardProps) => {
    return (
        <div
            className="lg:col-span-2 md:col-span-4 col-span-6 group border border-gray-300 dark:border-gray-600 rounded-md hover:bg-primary hover:border-primary transition-colors duration-300">
            <Link to={`./shop?category=${name}`} className="flex flex-col items-center justify-center py-8 gap-4 cursor-pointer">
                <Icon className="text-4xl group-hover:text-white transition-colors duration-300" />
                <p className="font-medium group-hover:text-white transition-colors duration-300">{name}</p>
            </Link>
        </div>
    )
}

export default CategorieCard