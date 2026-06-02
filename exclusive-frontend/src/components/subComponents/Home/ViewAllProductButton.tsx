import { Link } from "react-router-dom";

const ViewAllProductButtton = ({ title, end }: { title: string, end?: boolean }) => {
    return (
        <div className={end ? "text-end" : "text-center mt-10"}>
            <Link to="./shop"
                className="inline-block bg-primary text-white px-12 py-4 rounded-sm hover:bg-red-600 transition-colors duration-300 font-medium">
                {title}
            </Link>
        </div>
    );
};

export default ViewAllProductButtton;