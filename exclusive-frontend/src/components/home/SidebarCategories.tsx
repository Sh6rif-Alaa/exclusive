import { Link } from "react-router-dom";
import type { CategorieCardProps } from "../../types/components";

const SidebarCategories = ({ name }: Partial<CategorieCardProps>) => {
    return (
        <li>
            <Link to={`./shop?category=${name}`}>
                {name}
            </Link>
        </li>
    );
};

export default SidebarCategories;