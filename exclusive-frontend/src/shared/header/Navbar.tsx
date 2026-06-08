import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Heart, Menu, PackageOpen, Search, ShoppingCart, SquareArrowRightExit, Star, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/slice/authSlice";
import Image from "../../components/home/Image";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const totalCartUnits = useAppSelector((state) => state.cart?.items?.length || 0);
    const totalWishlistUnits = useAppSelector((state) => state.wishlist?.items?.length || 0);
    const { token, data: user, loading } = useAppSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            toast.success('Logout successfully');
            navigate("/");
        } catch (error) {
            toast.error(error as string);
        }
    }

    return (
        <nav className="navbar border-b border-gray-200 dark:border-gray-700 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link to="/" className="block font-bold text-xl">Exclusive</Link>
                    </div>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex gap-x-6 [&_a]:hover:text-primary font-medium">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/contact-us">Contact</NavLink>
                        <NavLink to="/about-us">About</NavLink>
                    </div>

                    {/* Right-side icons */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative hidden sm:block">
                            <input id="search" name="search" type="search" placeholder="What are you looking for?" className="border border-gray-300 rounded-md py-1.5 px-4 pr-10 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black text-sm w-52 transition-all text-slate-800 placeholder:text-xs placeholder:text-secondary" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search />
                            </span>
                        </div>

                        {/* Mobile menu */}
                        <div className="md:hidden relative group">
                            <button className="cursor-pointer hover:text-primary transition-colors">
                                <Menu size={20} className="icon-hover" />
                            </button>
                            <div className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50 group-hover:translate-y-0 translate-y-2">
                                <ul className="py-2 text-sm text-white rounded-lg shadow-2xl bg-linear-to-br from-menu via-menu2 to-black border border-white/20 backdrop-blur-xl flex flex-col mt-2 [&_a]:px-5 [&_a]:py-3 [&_a]:hover:bg-white/10 [&_a]:transition-colors [&_a]:border-none! [&_a]:hover:text-primary">
                                    <NavLink to="/" className="border-b border-white/10 first:rounded-t-lg">Home</NavLink>
                                    <NavLink to="/contact-us" className="border-b border-white/10">Contact</NavLink>
                                    <NavLink to="/about-us" className="border-b border-white/10">About</NavLink>
                                </ul>
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className="relative">
                            <NavLink to="/wishlist">
                                <Heart size={20} className="icon-hover" />
                                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                                    {totalWishlistUnits}
                                </span>
                            </NavLink>
                        </div>

                        {/* Cart */}
                        <div className="relative">
                            <NavLink to="/cart">
                                <ShoppingCart size={20} className="icon-hover" />
                                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                                    {totalCartUnits}
                                </span>
                            </NavLink>
                        </div>

                        {/* User menu */}
                        <div className="relative group">
                            <button className="size-9 bg-primary rounded-full flex justify-center items-center cursor-pointer hover:bg-red-600 transition-colors">
                                <User color="#ffffff" size={20} className="icon-hover" />
                            </button>

                            <div className="absolute right-0 top-full mt-2 w-56 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-20 transform group-hover:translate-y-0 translate-y-2">
                                <ul className="py-2 text-sm text-white rounded-lg shadow-2xl bg-linear-to-br from-menu via-menu2 to-black border border-white/20 backdrop-blur-xl [&_li]:px-4 [&_li]:py-3 [&_li]:hover:bg-white/10 [&_li]:cursor-pointer [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:transition-colors [&_li]:hover:text-primary">
                                    {token?.accessToken ? (
                                        <>
                                            {/* Greeting */}
                                            <li className="cursor-default! hover:bg-transparent! hover:text-white! border-b border-white/10">
                                                {user.profilePicture?.secure_url ?
                                                    <Image src={user.profilePicture.secure_url} lazy={false} alt="Profile Picture" className="size-7 rounded-full object-cover" />
                                                    : <User size={18} />
                                                }
                                                <span className="truncate">Hi, {user?.firstName ?? "User"}</span>
                                            </li>
                                            <li>
                                                <User size={20} className="icon-hover" />
                                                <NavLink to="/user-account">Manage My Account</NavLink>
                                            </li>
                                            <li>
                                                <PackageOpen size={20} className="icon-hover" />
                                                <NavLink to="/orders">My Orders</NavLink>
                                            </li>
                                            <li>
                                                <Star size={20} className="icon-hover" />
                                                <NavLink to="/reviews">My Reviews</NavLink>
                                            </li>
                                            <li className="border-t border-white/10">
                                                <button onClick={handleLogout} disabled={loading} className="w-full border-none flex items-center gap-3 cursor-pointer! hover:bg-transparent! hover:text-red-400!">
                                                    <SquareArrowRightExit size={20} />
                                                    <span>{loading ? <RotatingLines
                                                        width="24"
                                                        height="24"
                                                        strokeColor="#fff"
                                                        ariaLabel="rotating-lines-loading"
                                                    /> : 'Logout'}</span>
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <NavLink to="/login" className="w-full border-none flex items-center gap-3"><User size={20} className="icon-hover" />Log In</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/register" className="w-full border-none">Sign Up</NavLink>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Theme toggle */}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
