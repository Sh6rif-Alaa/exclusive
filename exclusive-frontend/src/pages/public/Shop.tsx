import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../../components/home/ProductCard";
import Breadcrumb from "../../shared/header/Breadcrumb";
import { productsData, categories } from "../../mockData/data";
import type { AdminCategory, AdminProduct } from "../../types/dashboard.type";
const PRODUCTS_PER_PAGE = 8;

const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [sortBy, setSortBy] = useState("default");
    const [maxPrice, setMaxPrice] = useState(2000);
    const [minRating, setMinRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const clearFilters = () => {
        setSelectedCategory("");
        setMaxPrice(2000);
        setMinRating(0);
        setSortBy("default");
        setCurrentPage(1);
    };

    const filteredProducts = useMemo(() => {
        return [...(productsData as AdminProduct[])]
            .filter((product) =>
                selectedCategory
                    ? product.category === selectedCategory
                    : true
            )
            .filter((product) => product.newPrice <= maxPrice)
            .filter((product) => product.rating >= minRating)
            .sort((a, b) => {
                switch (sortBy) {
                    case "low-price":
                        return a.newPrice - b.newPrice;

                    case "high-price":
                        return b.newPrice - a.newPrice;

                    case "rating":
                        return b.rating - a.rating;

                    case "sales":
                        return b.numberOfSales - a.numberOfSales;

                    default:
                        return 0;
                }
            });
    }, [selectedCategory, maxPrice, minRating, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Shop" },
                ]}
            />

            <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="container">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">All Products</h1>
                        <p className="text-muted-foreground"> Discover our complete collection of products</p>
                    </div>

                    {/* Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <button onClick={() => setIsOpen(true)} className="lg:hidden flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors duration-200 cursor-pointer"><SlidersHorizontal size={18} /> Filters</button>

                        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} className="border rounded-md px-4 py-2 active:text-primary [&_option]:text-slate-500 ms-auto">
                            <option value="default">Default</option>
                            <option value="low-price">Price Low To High</option>
                            <option value="high-price">Price High To Low</option>
                            <option value="rating">Best Rating</option>
                            <option value="sales">Best Selling</option>
                        </select>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="border rounded-lg p-5 space-y-6 sticky top-20">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">Filters</h3>
                                    <button onClick={clearFilters} className="text-primary text-sm hover:text-red-600 transition-colors duration-200 cursor-pointer">Clear All</button>
                                </div>

                                {/* Categories */}
                                <div>
                                    <h3 className="font-semibold mb-3">Categories</h3>

                                    <div className="space-y-2">
                                        {(categories as AdminCategory[]).map((category) => (
                                            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="category" checked={selectedCategory === category.name} onChange={() => {
                                                    setSelectedCategory(category.name);
                                                    setCurrentPage(1);
                                                }} />
                                                <span>{category.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <h3 className="font-semibold mb-3">Max Price</h3>

                                    <input type="range" min={0} max={2000} value={maxPrice} onChange={(e) => {
                                        setMaxPrice(Number(e.target.value));
                                        setCurrentPage(1);
                                    }} className="w-full accent-primary" />

                                    <p className="mt-2 text-sm">${maxPrice}</p>
                                </div>

                                {/* Rating */}
                                <div>
                                    <h3 className="font-semibold mb-3">Rating</h3>

                                    <div className="space-y-2">
                                        {[5, 4, 3, 2].map((rate) => (
                                            <label key={rate} className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="rating" checked={minRating === rate} onChange={() => {
                                                    setMinRating(rate);
                                                    setCurrentPage(1);
                                                }} />

                                                <span> {rate} Stars & Up </span>
                                            </label>
                                        ))}

                                        <button onClick={() => { setMinRating(0); setCurrentPage(1); }} className="text-primary text-sm hover:text-red-600 transition-colors duration-200 cursor-pointer">Clear Rating</button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Products */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {paginatedProducts.map((product) => (
                                    <div key={product.id} className="group">
                                        <ProductCard key={product.id} id={product.id} title={product.title} image={product.mainImage} rating={product.rating} review={product.review} newPrice={product.newPrice} oldPrice={product.oldPrice} discount={product.discount} category={product.category} colors={product.colors} />
                                    </div>
                                ))}
                            </div>

                            {!paginatedProducts.length && (
                                <div className="text-center py-20"> No Products Found </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-12">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-primary/80 transition-colors duration-200 cursor-pointer"> Prev </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 border rounded ${currentPage === page ? "bg-primary text-white border-primary" : ""} hover:bg-primary/80 transition-colors duration-200 cursor-pointer`}>
                                            {page}
                                        </button>
                                    ))}

                                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-primary/80 transition-colors duration-200 cursor-pointer"> Next </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Overlay */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                            }`}
                    />

                    {/* Mobile Drawer */}
                    <aside
                        className={`fixed top-0 left-0 h-screen w-80 bg-background z-50 transition-transform duration-300 lg:hidden overflow-y-auto ${isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                            }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-xl">Filters</h3>
                                <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors cursor-pointer"><X /></button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3">Categories</h4>

                                    <div className="space-y-2">
                                        {(categories as AdminCategory[]).map(
                                            (category) => (
                                                <label key={category.id} className="flex items-center gap-2">
                                                    <input type="radio" name="mobile-category" checked={selectedCategory === category.name}
                                                        onChange={() => setSelectedCategory(category.name)}
                                                    />
                                                    {category.name}
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3">Price </h4>
                                    <input type="range" min={0} max={2000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3">
                                        Rating
                                    </h4>

                                    <div className="space-y-2">
                                        {[5, 4, 3, 2].map((rate) => (
                                            <label key={rate} className="flex items-center gap-2">
                                                <input type="radio" checked={minRating === rate} onChange={() => setMinRating(rate)} />
                                                {rate} Stars & Up
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={clearFilters} className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors duration-200 cursor-pointer">
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section >
        </>
    );
};

export default Shop;