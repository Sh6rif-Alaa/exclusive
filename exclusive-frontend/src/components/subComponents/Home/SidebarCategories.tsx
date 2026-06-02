import { Link } from "react-router-dom";

interface sidebarCategoriesProps {
    title: string;
}

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