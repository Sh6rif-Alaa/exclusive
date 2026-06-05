import { useMemo, useState } from "react";
import { Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { useParams } from "react-router";
import Breadcrumb from "../../shared/header/Breadcrumb";
import ProductCard from "../../components/home/ProductCard";
import { productsData } from "../../mockData/data";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToCart } from "../../redux/slice/cartSlice";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import type { AdminProduct } from "../../types/dashboard.type";
import Image from "../../components/home/Image";

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const product = productsData.find((item) => item.id === id) as AdminProduct;
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product?.mainImage);
    const isWishlisted = useAppSelector((state) => state.wishlist.items.some((item) => item.id === id));

    const handleAddToCart = () => {
        dispatch(addToCart({ id: product?.id!, image: product?.mainImage!, title: product?.title!, price: product?.newPrice!, quantity }));
    };

    const handleToggleToWishlist = () => {
        dispatch(toggleWishlist({ id: product?.id!, image: product?.mainImage!, title: product?.title!, price: product?.newPrice! }));
    };

    const relatedProducts = useMemo(() => {
        if (!product) return [];

        return productsData.filter(
            (item) => item.category === product.category && item.id !== product.id
        ).slice(0, 4);
    }, [product]);

    if (!product) {
        return (
            <div className="container py-20 text-center">Product Not Found</div>
        );
    }

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Shop", href: "/shop" },
                    { label: product.title },
                ]}
            />

            <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
                        {/* Images */}
                        <div className="flex flex-col-reverse sm:flex-row gap-4 rounded-xl shadow-md p-6 md:p-8">
                            <div className="flex sm:flex-col gap-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSelectedImage(product.mainImage)}
                                        className="size-20 border rounded-lg overflow-hidden"
                                    >
                                        <Image src={product.mainImage} alt={product.title} skeleton={true} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 bg-muted rounded-xl p-6 flex items-center justify-center min-h-[500px]">
                                <Image src={selectedImage} alt={product.title} skeleton={true} className="max-h-[450px] object-contain" />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="rounded-xl shadow-md p-6 md:p-8">
                            <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>

                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm text-muted-foreground">⭐ {product.rating}</span>
                                <span className="text-sm text-muted-foreground">({product.review} Reviews)</span>
                                <span className="text-green-600 text-sm">In Stock</span>
                            </div>

                            <h2 className="text-3xl font-semibold mb-6">${product.newPrice}</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">High quality product with premium materials and excellent build quality. Designed for everyday use and long-lasting performance.</p>

                            <hr className="mb-6" />

                            {/* Colors */}
                            <div className="flex items-center gap-4 mb-6">
                                <span>Colours:</span>

                                <div className="flex gap-2">
                                    <button className="size-5 rounded-full bg-black border-2 border-primary" />
                                    <button className="size-5 rounded-full bg-red-500" />
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="flex items-center gap-4 mb-8">
                                <span>Size:</span>

                                <div className="flex gap-2">
                                    {["XS", "S", "M", "L", "XL"].map((size) => (
                                        <button key={size} className="size-10 border rounded-md hover:bg-primary hover:text-white transition-colors"> {size}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex border rounded-md">
                                    <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="px-4 border-r hover:bg-primary hover:text-white cursor-pointer transition-colors"><Minus size={18} /></button>
                                    <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} className="w-16 text-center outline-none" />
                                    <button onClick={() => setQuantity((prev) => prev + 1)} className="px-4 border-l hover:bg-primary hover:text-white cursor-pointer transition-colors"><Plus size={18} /></button>
                                </div>

                                <button onClick={handleAddToCart}
                                    className="bg-primary text-white px-8 py-2 rounded-md cursor-pointer hover:bg-primary/80 transition-colors">Buy Now</button>

                                <button onClick={handleToggleToWishlist}
                                    className={`border rounded-md size-10 flex items-center justify-center cursor-pointer ${isWishlisted ? "dark:hover:bg-white hover:bg-slate-100" : "hover:bg-primary dark:hover:bg-white"}`}>
                                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-primary" : ""} />
                                </button>
                            </div>

                            {/* Delivery */}
                            <div className="border rounded-lg overflow-hidden">
                                <div className="flex gap-4 p-5 border-b">
                                    <Truck className="shrink-0" />

                                    <div>
                                        <h3 className="font-medium">Free Delivery</h3>
                                        <p className="text-sm text-muted-foreground underline">Enter your postal code for Delivery Availability</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-5">
                                    <RotateCcw className="shrink-0" />

                                    <div>
                                        <h3 className="font-medium">Return Delivery</h3>
                                        <p className="text-sm text-muted-foreground">Free 30 Days Delivery Returns.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-4 h-8 bg-primary rounded" />
                                <h2 className="text-xl font-semibold">Related Items</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((product: AdminProduct) => (
                                    <div><ProductCard key={product.id} id={product.id} title={product.title} image={product.mainImage} rating={product.rating} review={product.review} newPrice={product.newPrice} oldPrice={product.oldPrice} discount={product.discount} category={product.category} colors={product.colors} /></div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section >
        </>
    );
};

export default ProductDetails;