import { Link } from "react-router-dom";
import type { sidebarCategoriesProps } from "../../types/components";

const SidebarCategories = ({ title }: sidebarCategoriesProps) => {
    return (
        <li>
            <Link to={`./shop?category=${title}`}>
                {title}
            </Link>
        </li>
    );
};

export default SidebarCategories;