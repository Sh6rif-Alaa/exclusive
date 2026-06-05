import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../../redux/store";
import Breadcrumb from "../../shared/header/Breadcrumb";
import FormInput from "../../components/form/FormInput";
import { checkoutBillingFields } from "../../schema/auth/authFields";
import { checkoutSchema } from "../../schema/user/user.validation";
import type { CheckoutType } from "../../schema/user/user.dto";

const inputStyle =
    "w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-primary transition";

const paymentOptions = [
    { id: "bank", label: "Bank", icons: ["https://img.icons8.com/color/48/visa.png", "https://img.icons8.com/color/48/mastercard.png"] },
    { id: "cod", label: "Cash on Delivery", icons: [] },
] as const;

type PaymentId = (typeof paymentOptions)[number]["id"];

const Checkout = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [paymentMethod, setPaymentMethod] = useState<PaymentId>("cod");
    const [couponCode, setCouponCode] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: "",
            company: "",
            street: "",
            apartment: "",
            city: "",
            phone: "",
            email: "",
        },
    });

    // handlers
    const handleApplyCoupon = () => {
        if (!couponCode.trim()) return;
        console.log("Apply coupon:", couponCode);
        // TODO: API  POST /coupons/validate  { code: couponCode }
    };

    const onSubmit: SubmitHandler<CheckoutType> = async (billingData) => {
        console.log("Place order:", { billingData, paymentMethod, cartItems });
        // TODO: API  POST /orders  { billingData, paymentMethod, items: cartItems }
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

                        {/* ── Billing form ── */}
                        <div className="lg:col-span-5">
                            <h2 id="billing-heading" className="text-2xl font-medium mb-8">Billing Details</h2>

                            <form id="billingForm" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1">
                                {checkoutBillingFields.map((field) => (
                                    <div key={field.name} className="space-y-1">
                                        <label htmlFor={field.name} className="block text-sm text-gray-500 dark:text-gray-400"> {field.label} </label>
                                        <FormInput
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            register={register}
                                            errors={errors}
                                            style={inputStyle}
                                        />
                                    </div>
                                ))}

                                {/* Save info checkbox */}
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="saveInfo" {...register("saveInfo")} className="h-5 w-5 accent-primary" />
                                    <label htmlFor="saveInfo" className="text-sm text-gray-700 dark:text-gray-300"> Save this information for faster check-out next time </label>
                                </div>
                            </form>
                        </div>

                        {/* Order summary */}
                        <aside className="lg:col-span-5 lg:col-start-8 flex flex-col gap-8">
                            {/* Cart items list */}
                            <ul className="space-y-4 divide-y divide-gray-200 dark:divide-gray-700">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <li key={item.id} className="flex items-center justify-between gap-4 py-4 first:pt-0">
                                            <div className="flex items-center gap-4">
                                                <div className="size-14 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                    <img src={item.image} alt={item.title} className="h-10 w-auto object-contain" />
                                                </div>
                                                <span className="font-medium text-sm"> {item.title} </span>
                                            </div>
                                            <span className="font-medium shrink-0"> ${(item.price * item.quantity).toFixed(2)} </span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center py-8 text-gray-500"> Your cart is empty. <Link to="/shop" className="text-primary hover:underline"> Go shopping </Link></li>
                                )}
                            </ul>

                            {/* Totals */}
                            <section className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4" aria-label="Order totals">
                                {[
                                    { label: "Subtotal:", value: `$${subtotal.toFixed(2)}` },
                                    { label: "Shipping:", value: "Free" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between text-gray-700 dark:text-gray-300">
                                        <span>{label}</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </section>

                            {/* Payment methods */}
                            <fieldset className="space-y-5">
                                <legend className="text-lg font-medium">Payment Method</legend>
                                {paymentOptions.map(({ id, label, icons }) => (
                                    <div key={id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="payment" id={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id)} className="h-5 w-5 accent-black" />
                                            <label htmlFor={id} className="font-medium cursor-pointer">
                                                {label}
                                            </label>
                                        </div>
                                        {icons.length > 0 && (
                                            <div className="flex gap-2">
                                                {icons.map((src: string) => (
                                                    <img key={src} src={src} className="h-8 w-auto" alt="" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </fieldset>

                            {/* Coupon */}
                            <div className="flex gap-4 h-14">
                                <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 rounded-md bg-gray-100 dark:bg-gray-700 px-5 text-sm placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-primary" />
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="bg-red-600 px-8 text-white font-medium rounded-md hover:bg-red-700 cursor-pointer transition-colors" >
                                    Apply Coupon
                                </button>
                            </div>

                            {/* Place order – submits the billing form */}
                            <button type="submit" form="billingForm" disabled={isSubmitting || cartItems.length === 0} className="bg-red-600 text-white py-4 px-12 rounded-md font-medium hover:bg-red-700 w-fit cursor-pointer transition-colors disabled:opacity-50" >
                                {isSubmitting ? "Placing Order…" : "Place Order"}
                            </button>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
