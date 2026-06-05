import { Link } from "react-router-dom"

const TopBanner = () => {
    return (
        <div id="banner" className="bg-black text-white py-2 text-sm relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* sales */}
                <div className="sm:ms-24 text-center flex-1 sm:text-sm text-xs">
                    Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!
                    <Link to="/shop" className="underline ml-1 font-semibold">ShopNow</Link>
                </div>
                {/* selected language */}
                <div className="relative group w-24 flex justify-end">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
                        <span>English</span>
                        <i
                            className="fa-solid fa-angle-down text-xs mt-0.5 transition-transform duration-300 group-hover:rotate-180"></i>
                    </div>
                    {/* language menu */}
                    <div className="absolute top-full right-0 mt-2 w-32 bg-black text-white border border-white/20 rounded shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 flex flex-col py-1 z-50 [&_a]:px-4 [&_a]:py-2 [&_a]:hover:bg-white/10 [&_a]:transition-colors [&_a]:text-left">
                        <Link to="#" className="flex justify-between items-center">
                            English
                            <i className="fa-solid fa-check text-xs text-green-500"></i>
                        </Link>
                        <Link to="#">
                            Arabic
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBanner