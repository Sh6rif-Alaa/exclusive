import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/header/Breadcrumb";
import CartItem from "../../components/items/CartItem";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clearCart } from "../../redux/slice/cartSlice";

const Cart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Cart" },
                ]}
            />

            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8 justify-between mt-16">
                        <div className="w-full lg:w-2/3">
                            <div className="hidden md:grid grid-cols-4 bg-white dark:bg-slate-800 shadow rounded-md p-6">
                                <h3>Product</h3>
                                <h3 className="text-center">Price</h3>
                                <h3 className="text-center">Quantity</h3>
                                <h3 className="text-center">Subtotal</h3>
                            </div>
                            <div className="space-y-5 mt-8">

                                {items.length ? (
                                    items.map((item) => <CartItem key={item.id} title={item.title} image={item.image} price={item.price} quantity={item.quantity} id={item.id} />)
                                ) : (
                                    <div className="text-center py-20">Your cart is empty</div>
                                )}
                            </div>
                            <button onClick={() => dispatch(clearCart())} className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4 float-end">
                                Clear Cart
                            </button>
                        </div>

                        <div>
                            <div className="w-full lg:w-[400px] border rounded-md p-6">
                                <h3 className="font-semibold text-xl mb-6">Cart Total</h3>
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between">
                                    <span>Total Items</span>
                                    <span>{totalItems}</span>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${subtotal}</span>
                                </div>

                                <Link to="/checkout" className="block text-center bg-primary text-white py-3 rounded-md mt-6 transition-colors hover:bg-primary/90">
                                    Proceed To Checkout
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-wrap mt-6">
                        <input type="text" placeholder="Coupon Code" className="border px-4 py-3 rounded-md" />
                        <button className="bg-primary text-white px-6 py-3 rounded-md transition-colors hover:bg-primary/90 cursor-pointer">Apply Coupon</button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Cart;