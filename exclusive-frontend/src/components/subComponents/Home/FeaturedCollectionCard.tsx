import { Link } from "react-router-dom";

interface FeaturedCollectionCardProps {
    item: {
        id: number;
        title: string;
        description: string;
        image: string;
    };
    index: number;
}

const FeaturedCollectionCard = ({ item, index, }: FeaturedCollectionCardProps) => {
    const isHero = index === 0;
    const isWide = index === 1;
    const isSmall = index >= 2;

    return (
        <div className={`relative bg-black rounded-md overflow-hidden group ${isHero ? "lg:col-span-2 lg:row-span-2 flex items-end justify-center" : isWide ? "lg:col-span-2 flex items-center justify-end" : "flex items-center justify-center p-4"}`}>
            {isSmall && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
            )}

            <img src={item.image} alt={item.title} className={`transition-transform duration-300 ${isSmall ? "group-hover:scale-110 drop-shadow-[0_0_60px_rgba(255,255,255,.5)]" : "group-hover:scale-105"} ${isHero ? "-mb-5" : isWide ? "-mb-5 opacity-90 drop-shadow-[0_0_60px_rgba(255,255,255,.1)]" : ""}`} />

            <div className={`absolute bottom-0 left-0 z-20 ${isHero ? "p-8 w-full space-y-3" : isWide ? "p-6 w-full md:w-1/2 space-y-3" : "p-6 w-full space-y-2"}`}>
                <h3 className={`text-white font-semibold font-inter ${isSmall ? "text-xl" : "text-2xl"}`}>
                    {item.title}
                </h3>

                <p className={`text-gray-300 ${isHero ? "text-sm w-3/4" : isWide ? "text-sm" : "text-xs"}`}>
                    {item.description}
                </p>

                <Link to="/shop" className="inline-block text-white font-medium underline underline-offset-4 hover:text-gray-300 transition-colors">
                    Shop Now
                </Link>
            </div>
        </div>
    );
}

export default FeaturedCollectionCard