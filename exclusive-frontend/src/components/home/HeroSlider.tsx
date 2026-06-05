import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import heroSlide1 from "../../assets/images/hero-slide1.webp";
import heroSlide2 from "../../assets/images/hero-slide2.webp";
import "swiper/css";
import "swiper/css/pagination";
import Image from "./Image";


const slides = [
    {
        id: 1,
        title: "iPhone 14 Series",
        heading: "Up to 10% off Voucher",
        image: heroSlide1,
    },
    {
        id: 2,
        title: "JBL Speaker",
        heading: "Music Experience",
        image: heroSlide2,
    },
];

const HeroSlider = () => {
    return (
        <Swiper modules={[Pagination, Autoplay]} loop
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            className="hero-swiper mt-4 lg:mt-10"
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="bg-black text-white relative overflow-hidden">
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-10 md:py-6 md:px-8 gap-8">
                            {/* content */}
                            <div className="space-y-2 md:space-y-4 text-center md:text-left z-10">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <p className="text-sm md:text-base">
                                        {slide.title}
                                    </p>
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight font-inter">
                                    {slide.heading}
                                </h1>

                                <div className="flex items-center justify-center md:justify-start gap-x-4 group cursor-pointer">
                                    <Link
                                        to="/shop"
                                        className="underline underline-offset-8 group-hover:text-primary transition-colors duration-300 font-medium"
                                    >
                                        Shop Now
                                    </Link>

                                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                                </div>
                            </div>

                            {/* image */}
                            <div className="relative w-full max-w-75 md:max-w-100">
                                <Image src={slide.image} alt={slide.title} lazy={false} className="w-full" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HeroSlider;