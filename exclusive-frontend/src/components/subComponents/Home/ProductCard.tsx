import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { Heart, Eye } from "lucide-react"

interface ProductCardProps {
    id: string;
    title: string;
    newPrice: number;
    oldPrice?: number;
    image: string;
    discount?: number;
    rating: number;
    review: number;
    color?: string;
}

const ProductCard = ({ id, title, newPrice, oldPrice, image, discount, rating, review, color }: ProductCardProps) => {
    return (
        <>
            <div
                className="w-full h-62.5 bg-gray-100 dark:bg-gray-800 rounded-md relative flex items-center justify-center overflow-hidden">
                {discount && <span
                    className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-sm z-10">-{discount}%</span>}
                {/* icons  */}
                <div
                    className="absolute top-3 right-3 z-20 flex flex-col gap-2 [&_button]:w-8 [&_button]:h-8 [&_button]:rounded-full [&_button]:bg-white [&_button]:dark:bg-gray-900 [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:cursor-pointer [&_button]:hover:bg-primary [&_button]:hover:text-white [&_button]:transition-colors [&_button]:shadow-sm">
                    <button> <Heart /> </button>
                    <button> <Eye /> </button>
                </div>
                {/* product img */}
                <Link to={`/product-details/${id}`}>
                    <img src={image} alt={title}
                        className="w-full hover:scale-110 transition-transform duration-300" />
                </Link>
                <button
                    className="absolute bottom-0 w-full bg-black text-white py-2 font-medium text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer hover:text-primary">
                    Add To Cart
                </button>
            </div>
            {/* product content */}
            <div className="mt-4 space-y-2">
                <h3 className="font-medium truncate hover:text-primary">
                    <Link to={`/product-details/${id}`}>{title}</Link>
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-primary font-medium">${newPrice}</span>
                    {oldPrice && <span className="text-gray-400 line-through text-sm">${oldPrice}</span>}
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <Rating
                        readonly
                        initialValue={rating}
                        size={18}
                        allowFraction
                        SVGclassName="inline-block"
                    />
                    <span className="text-gray-400 text-xs font-semibold">({review})</span>
                </div>
            </div>
            {/* product color */}
            {color && (
                <div className="flex items-center gap-3 mt-2">
                    <button
                        className={`size-3 rounded-full ${color} cursor-pointer ring-2 ring-slate-900 ring-offset-2 focus:outline-none`}></button>

                    <button
                        className="size-5 rounded-full bg-primary cursor-pointer hover:ring-2 hover:ring-red-500 hover:ring-offset-1 transition-all"></button>
                </div>
            )}
        </>
    )
}

export default ProductCard; 