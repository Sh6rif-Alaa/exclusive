import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleWishlist, type WishlistItemType } from "../../redux/slice/wishlistSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import { useAppDispatch } from "../../redux/store";
import Image from "../home/Image";

const WishlistItem = ({ id, image, price, title }: WishlistItemType) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id, image, title, price, quantity: 1 }));
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-md shadow overflow-hidden">

            <div className="relative bg-gray-100 dark:bg-slate-700 h-60 flex items-center justify-center">

                <Link to={`/products/${id}`}>
                    <Image src={image} alt={title} skeleton={true} className="h-40 object-contain" />
                </Link>

                <button
                    onClick={() => dispatch(toggleWishlist({ id, title, image, price }))}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow cursor-pointer hover:text-primary text-slate-800">
                    <Trash2 size={18} />
                </button>
            </div>

            <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 flex justify-center items-center gap-2 cursor-pointer hover:bg-primary transition-colors">
                <ShoppingCart size={18} />

                <span>Add To Cart</span>
            </button>

            <div className="p-4">

                <Link
                    to={`/products/${id}`}
                    className="font-medium line-clamp-2 hover:text-primary">

                    {title}
                </Link>

                <p className="text-primary font-semibold mt-2">
                    ${price}
                </p>
            </div>
        </div>
    );
};

export default WishlistItem;