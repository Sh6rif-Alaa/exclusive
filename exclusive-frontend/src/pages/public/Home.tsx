import ProductCard from "../../components/home/ProductCard";
import { categories, featuredCollections, servicesData, sidebarCategories, productsData } from "../../data/data"
import CategorieCard from "../../components/home/CategorieCard";
import SidebarCategories from "../../components/home/SidebarCategories";
import CountDown from "../../components/home/CountDown";
import SectionHeader from "../../components/home/SectionHeader";
import ScrollButtons from "../../components/home/ScrollButtons";
import ViewAllProductButtton from "../../components/home/ViewAllProductButton";
import FeaturedCollectionCard from "../../components/home/FeaturedCollectionCard";
import ServiceCard from "../../components/home/ServiceCard";
import adsImg from "../../assets/images/hero-slide2.webp"
import HeroSlider from "../../components/home/HeroSlider";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Home = () => {
    return (
        <>
            {/* hero */}
            <section id="hero" className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* categories */}
                        <div className="hidden lg:block w-64 shrink-0 border-r border-gray-200 dark:border-gray-700 pt-10 pe-6">
                            <ul
                                className="space-y-6 [&_a]:hover:text-primary [&_a]:transition-colors [&_a]:duration-300 dark:text-gray-300">
                                {sidebarCategories.map((category) => (
                                    <SidebarCategories key={category.id} title={category.title} />
                                ))}
                            </ul>
                        </div>
                        {/* slider */}
                        <div className="mt-4 lg:mt-10 bg-black text-white flex-1 relative overflow-hidden w-full">
                            <HeroSlider />
                        </div>
                    </div>
                </div>
            </section>
            {/* sales */}
            <section id="sales" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4 mb-10">
                        <div className="flex flex-col md:flex-row md:items-end gap-x-20 gap-y-4">
                            {/* header */}
                            <SectionHeader title="Today's" subtitle="Flash Sales" />
                            {/* timer */}
                            <CountDown targetDate={new Date("2026-07-01")} variant="sales" />
                        </div>
                        {/* scroll buttons */}
                        <ScrollButtons prevClass="sales-prev" nextClass="sales-next" />
                    </div>
                    {/* products cards */}
                    <div className="flex gap-8 overflow-x-auto pb-8 snap-x scroll-smooth scrollbar-hide">
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".sales-prev",
                                nextEl: ".sales-next",
                            }}
                            spaceBetween={32}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {productsData.slice(-8).reverse().map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="relative group">
                                        <ProductCard
                                            id={product.id}
                                            title={product.title}
                                            newPrice={product.newPrice}
                                            oldPrice={product?.oldPrice}
                                            image={product.image}
                                            discount={product?.discount}
                                            rating={product.rating}
                                            review={product.review}
                                            color={product?.color}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    {/* all products */}
                    <ViewAllProductButtton title="View All Product" />
                </div>
            </section>
            {/* categories */}
            <section id="categories">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-gray-200 dark:border-gray-700 py-20">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4 mb-10">
                        <div className="flex flex-col md:flex-row md:items-end gap-x-20 gap-y-4">
                            {/* header */}
                            <SectionHeader title="Categories" subtitle="Browse By Category" />
                        </div>
                        {/* scroll buttons */}
                        <ScrollButtons prevClass="categories-prev" nextClass="categories-next" />
                    </div>
                    {/* categories cards */}
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".categories-prev",
                            nextEl: ".categories-next",
                        }}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category.id}>
                                <CategorieCard
                                    title={category.title}
                                    icon={category.icon}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            {/* best selling */}
            <section id="best-selling" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4 mb-10">
                        <div className="flex flex-col md:flex-row md:items-end gap-x-20 gap-y-4">
                            {/* header */}
                            <SectionHeader title="This Month" subtitle="Best Selling Products" />
                        </div>
                        {/* all products */}
                        <ViewAllProductButtton title="View All" end={true} />
                    </div>
                    {/* products cards */}
                    <div className="grid grid-cols-12 lg:gap-8 sm:gap-4 gap-0 gap-y-6">
                        {/* first four products that has best sales (products must ordred by numberOfSales descending from backend) */}
                        {productsData.slice(0, 4).map((product) => (
                            <div key={product.id} className="lg:col-span-3 sm:col-span-6 col-span-12 relative group">
                                <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    newPrice={product.newPrice}
                                    oldPrice={product?.oldPrice}
                                    image={product.image}
                                    discount={product?.discount}
                                    rating={product.rating}
                                    review={product.review}
                                    color={product?.color}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ads */}
            <section id="ads" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black rounded-lg overflow-hidden p-6 md:p-12 lg:py-16 lg:px-20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* ads content */}
                            <div className="flex-1 text-white space-y-6 md:space-y-10 text-center md:text-left">
                                <p className="text-ads font-medium">Categories</p>
                                <h2 className="text-4xl md:text-5xl font-semibold font-inter leading-tight">Enhance Your <br />
                                    Music Experience</h2>
                                {/* timer */}
                                <CountDown targetDate={new Date("2026-07-15")} variant="ads" />
                                <div>
                                    <button
                                        className="bg-ads text-white px-10 py-4 rounded-sm font-medium hover:bg-green-600 transition-colors duration-300 cursor-pointer">
                                        Buy Now!
                                    </button>
                                </div>
                            </div>
                            {/* ads img */}
                            <div className="flex-1 relative">
                                <img src={adsImg} alt="JBL Speaker"
                                    className="w-full drop-shadow-[0_0_120px_rgba(255,255,255,.5)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* products */}
            <section id="products" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4 mb-10">
                        <div className="flex flex-col md:flex-row md:items-end gap-x-20 gap-y-4">
                            {/* header */}
                            <SectionHeader title="Our Products" subtitle="Explore Our Products" />
                        </div>
                        {/* scroll buttons */}
                        <ScrollButtons prevClass="products-prev" nextClass="products-next" />
                    </div>
                    {/* products cards */}
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".products-prev",
                            nextEl: ".products-next",
                        }}
                        spaceBetween={32}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {productsData.slice(8, 16).map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="relative group">
                                    <ProductCard
                                        id={product.id}
                                        title={product.title}
                                        newPrice={product.newPrice}
                                        oldPrice={product?.oldPrice}
                                        image={product.image}
                                        discount={product?.discount}
                                        rating={product.rating}
                                        review={product.review}
                                        color={product?.color}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* all products */}
                    <ViewAllProductButtton title="View All Product" />
                </div>
            </section>
            {/* featured */}
            <section id="featured" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4 mb-10">
                        <div className="flex flex-col md:flex-row md:items-end gap-x-20 gap-y-4">
                            {/* header */}
                            <SectionHeader title="Featured" subtitle="New Arrival" />
                        </div>
                    </div>
                    {/* collections */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full min-h-150 [&_a]:inline-block [&_a]:text-white [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gray-300 [&_a]:transition-colors">
                        {featuredCollections.map((item, index) => (
                            <FeaturedCollectionCard
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
            {/* services */}
            <section id="services" className="py-20 mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 text-center [&_h3]:font-bold [&_h3]:uppercase t[&_h3]:ext-lg [&_h3]:font-inter [&_p]:text-sm [&_p]:text-gray-600 [&_p]:dark:text-gray-400">
                        {servicesData.map((service) => (
                            <ServiceCard
                                key={service.id}
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default Home;