import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import Breadcrumb from "../../shared/header/Breadcrumb";

const Checkout = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const [billingData, setBillingData] = useState({
        firstName: "",
        company: "",
        street: "",
        apartment: "",
        city: "",
        phone: "",
        email: "",
        saveInfo: false,
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [couponCode, setCouponCode] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setBillingData({
            ...billingData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePlaceOrder = () => {
        // TODO: API call to place order
        console.log("Place order:", { billingData, paymentMethod, cartItems });
    };

    const handleApplyCoupon = () => {
        // TODO: API call to apply coupon
        console.log("Apply coupon:", couponCode);
    };

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Cart", href: "/cart" },
                    { label: "Checkout" },
                ]}
            />

            <section id="checkout" aria-labelledby="billing-heading" className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* Billing Form */}
                        <div
                            className="lg:col-span-5"
                            aria-labelledby="billing-heading"
                        >
                            <h2
                                id="billing-heading"
                                className="text-2xl font-medium mb-8"
                            >
                                Billing Details
                            </h2>

                            <form id="billingForm" className="space-y-6">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm text-gray-500"
                                    >
                                        First Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        value={billingData.firstName}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="company"
                                        className="block text-sm text-gray-500"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        value={billingData.company}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="street"
                                        className="block text-sm text-gray-500"
                                    >
                                        Street Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        required
                                        value={billingData.street}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="apartment"
                                        className="block text-sm text-gray-500"
                                    >
                                        Apartment, floor, etc. (optional)
                                    </label>
                                    <input
                                        id="apartment"
                                        name="apartment"
                                        type="text"
                                        value={billingData.apartment}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm text-gray-500"
                                    >
                                        Town/City{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        required
                                        value={billingData.city}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm text-gray-500"
                                    >
                                        Phone Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        value={billingData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="billingEmail"
                                        className="block text-sm text-gray-500"
                                    >
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="billingEmail"
                                        name="email"
                                        type="email"
                                        required
                                        value={billingData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="save"
                                        name="saveInfo"
                                        checked={billingData.saveInfo}
                                        onChange={handleChange}
                                        className="h-5 w-5 accent-primary"
                                    />
                                    <label
                                        htmlFor="save"
                                        className="text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Save this information for faster
                                        check-out next time
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <aside className="lg:col-span-5 lg:col-start-8 flex flex-col gap-8">
                            <ul className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between gap-4 py-4 first:pt-0"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="size-14 rounded flex items-center justify-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-10 w-auto"
                                                    />
                                                </div>
                                                <span className="font-medium">
                                                    {item.title}
                                                </span>
                                            </div>
                                            <span className="font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center py-8 text-gray-500">
                                        Your cart is empty.{" "}
                                        <Link
                                            to="/shop"
                                            className="text-primary hover:underline"
                                        >
                                            Go shopping
                                        </Link>
                                    </li>
                                )}
                            </ul>

                            <section
                                className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4"
                                aria-label="Order totals"
                            >
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </section>

                            {/* Payment Methods */}
                            <fieldset className="space-y-5">
                                <legend className="text-lg font-medium">
                                    Payment Method
                                </legend>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="bank"
                                            checked={paymentMethod === "bank"}
                                            onChange={() =>
                                                setPaymentMethod("bank")
                                            }
                                            className="h-5 w-5 accent-black"
                                        />
                                        <label
                                            htmlFor="bank"
                                            className="font-medium"
                                        >
                                            Bank
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <img
                                            src="https://img.icons8.com/color/48/visa.png"
                                            className="h-8 w-auto"
                                            alt="Visa"
                                        />
                                        <img
                                            src="https://img.icons8.com/color/48/mastercard.png"
                                            className="h-8 w-auto"
                                            alt="Mastercard"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        id="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={() =>
                                            setPaymentMethod("cod")
                                        }
                                        className="h-5 w-5 accent-black"
                                    />
                                    <label
                                        htmlFor="cod"
                                        className="font-medium"
                                    >
                                        Cash on delivery
                                    </label>
                                </div>
                            </fieldset>

                            {/* Coupon */}
                            <div className="flex gap-4 h-14">
                                <input
                                    type="text"
                                    id="couponCode"
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                    className="flex-1 rounded-md bg-gray-100 dark:bg-gray-700 px-5 text-sm placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="bg-red-600 px-8 text-white font-medium rounded-md hover:bg-red-700 cursor-pointer transition-colors"
                                >
                                    Apply Coupon
                                </button>
                            </div>

                            {/* Place Order */}
                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                className="bg-red-600 text-white py-4 px-12 rounded-md font-medium hover:bg-red-700 w-fit cursor-pointer transition-colors"
                            >
                                Place Order
                            </button>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
