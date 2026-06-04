import { Minus, Plus, Trash2 } from "lucide-react";
import { decreaseQuantity, increaseQuantity, removeFromCart, updateQuantity, type CartItemType } from "../../redux/slice/cartSlice";
import { useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";

const CartItem = ({ image, id, price, quantity, title }: CartItemType) => {
    const dispatch = useAppDispatch();

    return (
        <div className="grid md:grid-cols-4 gap-4 items-center bg-white dark:bg-slate-800 shadow rounded-md p-6">

            <div className="flex items-center gap-4">
                <Link to={`/products/${id}`} className="shrink-0">
                    <img src={image} alt={title} className="size-20 object-contain transition-transform hover:scale-105" />
                </Link>

                <div>
                    <Link to={`/products/${id}`} className="line-clamp-1 hover:text-primary transition-colors">{title}</Link>

                    <button
                        onClick={() => dispatch(removeFromCart(id))}
                        className="flex items-center gap-1 text-red-500 text-sm mt-2 cursor-pointer hover:text-primary">
                        <Trash2 size={16} />
                        Remove
                    </button>
                </div>
            </div>

            <p className="text-center">${price}</p>

            <div className="flex justify-center items-center gap-3">
                <button
                    onClick={() => quantity <= 1 ? dispatch(removeFromCart(id)) : dispatch(decreaseQuantity(id))}
                    className='border p-2 rounded hover:text-primary cursor-pointer'>
                    <Minus size={16} />
                </button>

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => dispatch(updateQuantity({ id, quantity: Math.max(1, Number(e.target.value)) }))}
                    min={1}
                    className="border rounded w-10 h-9 text-center focus:border-primary outline-none"
                />

                <button
                    onClick={() => dispatch(increaseQuantity(id))}
                    className="border p-2 rounded cursor-pointer hover:text-primary">
                    <Plus size={16} />
                </button>

            </div>

            <p className="text-center font-medium">
                ${(price * quantity).toLocaleString()}
            </p>

        </div>
    );
};

export default CartItem;