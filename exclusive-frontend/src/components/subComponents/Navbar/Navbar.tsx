import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Heart, Menu, PackageOpen, Search, ShoppingCart, SquareArrowRightExit, Star, User } from "lucide-react"

const Navbar = () => {
    return (

        <nav className="navbar border-b border-gray-200 dark:border-gray-700 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* logo */}
                    <div className="shrink-0">
                        <Link to="/" className="block font-bold text-xl">Exclusive</Link>
                    </div>
                    {/* links */}
                    <div className="hidden md:flex gap-x-6 [&_a]:hover:text-primary font-medium">
                        <NavLink to="/" className="link-active">Home</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/sign-up">Sign Up</NavLink>
                    </div>
                    {/* search & mobile menu & icons */}
                    <div
                        className="flex items-center space-x-4">
                        {/* search */}
                        <div className="relative hidden sm:block">
                            <input id="search" name="search" type="search" placeholder="What are you looking for?"
                                className="border border-gray-300 rounded-md py-1.5 px-4 pr-10 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black text-sm w-52 transition-all text-slate-800 placeholder:text-xs placeholder:text-secondary" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search />
                            </span>
                        </div>
                        {/* mobile menu links */}
                        <div className="md:hidden relative group">
                            <button id="mobile-menu-btn" className="cursor-pointer hover:text-primary transition-colors">
                                <Menu size={20} className={'icon-hover'} />
                            </button>
                            <div id="mobile-menu"
                                className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50 group-hover:translate-y-0 translate-y-2">
                                <ul
                                    className="py-2 text-sm text-white rounded-lg shadow-2xl bg-linear-to-br from-menu via-menu2 to-black border border-white/20 backdrop-blur-xl flex flex-col mt-2 [&_a]:px-5 [&_a]:py-3 [&_a]:hover:bg-white/10 [&_a]:transition-colors [&_a]:border-none! [&_a]:hover:text-primary">
                                    <NavLink to="#" className="border-b border-white/10 first:rounded-t-lg link-active">
                                        Home
                                    </NavLink>
                                    <NavLink to="./contact-us.html" className="border-b border-white/10">
                                        Contact
                                    </NavLink>
                                    <NavLink to="./about-us.html" className="border-b border-white/10">
                                        About
                                    </NavLink>
                                    <NavLink to="./sign-up.html" className="last:rounded-b-lg">
                                        Sign Up
                                    </NavLink>
                                </ul>
                            </div>
                        </div>
                        {/* wishlist */}
                        <div className="relative">
                            <NavLink to="./wishlist.html">
                                <Heart size={20} className={'icon-hover'} />
                                <span
                                    className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                                    2
                                </span>
                            </NavLink>
                        </div>
                        {/* cart */}
                        <div className="relative">
                            <NavLink to="./cart.html">
                                <ShoppingCart size={20} className={'icon-hover'} />
                                <span
                                    className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                                    2
                                </span>
                            </NavLink>
                        </div>
                        {/* user */}
                        <div className="relative group">
                            <button id="user-menu-btn"
                                className="size-9 bg-primary rounded-full flex justify-center items-center cursor-pointer hover:bg-red-600 transition-colors">
                                <User color="#ffffff" size={20} className={'icon-hover'} />
                            </button>

                            {/* user menu */}
                            <div id="user-menu"
                                className="absolute right-0 top-full mt-2 w-56 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-20 transform group-hover:translate-y-0 translate-y-2">
                                <ul
                                    className="py-2 text-sm text-white rounded-lg shadow-2xl bg-linear-to-br from-menu via-menu2 to-black border border-white/20 backdrop-blur-xl [&_li]:px-4 [&_li]:py-3 [&_li]:hover:bg-white/10 [&_li]:cursor-pointer [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:transition-colors [&_li]:hover:text-primary [&_li]:*:hover:text-primary">
                                    <li>
                                        <User size={20} className={'icon-hover'} />
                                        <NavLink to="./user-account.html">Manage My Account</NavLink>
                                    </li>
                                    <li>
                                        <PackageOpen size={20} className={'icon-hover'} />
                                        <NavLink to="./orders.html">My Order</NavLink>
                                    </li>

                                    <li>
                                        <Star size={20} className={'icon-hover'} />
                                        <span>My Reviews</span>
                                    </li>
                                    <li className="text-white mt-1 border-t border-white/10">
                                        <SquareArrowRightExit size={20} className={'icon-hover'} />
                                        <span>Logout</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* theme toggle */}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>

    )
};

export default Navbar;