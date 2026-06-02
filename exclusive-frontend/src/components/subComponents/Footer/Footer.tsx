import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-8 pb-4">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 text-sm text-gray-300">
                {/* 1. Exclusive + Newsletter */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Exclusive</h3>
                    <p className="font-bold text-white">Subscribe</p>
                    <p>Get 10% off your first order</p>
                    <form className="relative flex">
                        <input type="email" placeholder="Enter your email"
                            className="w-full rounded-md bg-transparent border border-white px-4 py-2 pr-12 text-white placeholder:text-gray-400" />
                        <button type="submit"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white rounded-md p-2 hover:bg-red-600"
                            aria-label="Subscribe to newsletter">
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
                {/* Support */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Support</h4>
                    <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p>exclusive@gmail.com</p>
                    <p>+88015-88888-9999</p>
                </div>
                {/* Account */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Account</h4>
                    <ul className="space-y-2">
                        <li><Link to="./user-account.html" className="hover:text-white">My Account</Link></li>
                        <li><Link to="./login.html" className="hover:text-white">Login / Register</Link></li>
                        <li><Link to="./cart.html" className="hover:text-white">Cart</Link></li>
                        <li><Link to="./wishlist.html" className="hover:text-white">Wishlist</Link></li>
                        <li><Link to="./shop.html" className="hover:text-white">Shop</Link></li>
                    </ul>
                </div>
                {/* Quick Link */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Quick Link</h4>
                    <ul className="space-y-2">
                        <li><Link to="./privacy.html" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="./terms.html" className="hover:text-white">Terms Of Use</Link></li>
                        <li><Link to="./faq.html" className="hover:text-white">FAQ</Link></li>
                        <li><Link to="./contact-us.html" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                {/* Download App & Social Links */}
                <div className="space-y-5">
                    <h4 className="text-lg font-bold text-white">Download App</h4>
                    <p className="text-xs text-gray-400">Save $3 with App New User Only</p>

                    <div className="flex flex-col">
                        <Link to="#" className="block ">
                            <img src="./assets/images/GooglePlay.svg" alt="Download on the Google Play"
                                className="h-12 w-44 " />
                        </Link>

                        <Link to="#" className="block">
                            <img src="./assets/images/AppStore.svg" alt="Download on the App Store" className="h-12 w-44" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 text-2xl pt-3 text-gray-400">
                        <Link to="#" className="hover:text-white hover:scale-110" aria-label="Facebook">
                            <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                        <Link to="#" className="hover:text-white hover:scale-110" aria-label="Twitter">
                            <i className="fa-brands fa-x-twitter"></i>
                        </Link>
                        <Link to="#" className="hover:text-white hover:scale-110" aria-label="Instagram">
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                        <Link to="#" className="hover:text-white hover:scale-110" aria-label="LinkedIn">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Copyright */}
            <div className="border-t border-gray-900 mt-6 pt-6 text-center text-gray-600 text-xs uppercase tracking-widest">
                © Copyright Rimel 2026. All right reserved
            </div>
        </footer>
    )
}
export default Footer