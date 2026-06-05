import Breadcrumb from "../../shared/header/Breadcrumb";
import WishlistItem from "../../components/items/WishlistItem";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clearWishlist } from "../../redux/slice/wishlistSlice";
import { addToCart } from "../../redux/slice/cartSlice";

const Wishlist = () => {
    const wishlistItems = useAppSelector((state) => state.wishlist.items);
    const dispatch = useAppDispatch();

    const AddAllToCart = () => {
        wishlistItems.forEach((item) => {
            dispatch(addToCart({ ...item, quantity: 1 }));
        });
    };

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Wishlist" },
                ]}
            />

            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center mt-16 mb-10">

                        <h2 className="text-xl font-semibold">
                            Wishlist ({wishlistItems.length})
                        </h2>

                        <div className="flex gap-2">
                            {wishlistItems.length > 0 && (
                                <button
                                    onClick={AddAllToCart}
                                    className="border px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-colors cursor-pointer">
                                    Add All To Cart
                                </button>
                            )}

                            {wishlistItems.length && (
                                <button
                                    onClick={() => dispatch(clearWishlist())}
                                    className="border px-6 py-3 rounded-md hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                                    Clear Wishlist
                                </button>
                            )}
                        </div>
                    </div>

                    {wishlistItems.length ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            {wishlistItems.map((item) => (
                                <WishlistItem key={item.id} {...item} />
                            ))}

                        </div>
                    ) : (
                        <div className="text-center py-20">
                            Your wishlist is empty
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Wishlist;