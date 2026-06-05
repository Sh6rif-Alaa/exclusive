import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product4 from "../assets/images/product-4.png";
import product5 from "../assets/images/product-5.png";
import type { Address, Order, OrderStatus, PaymentMethod, Review, TrackingStep } from "../types/dashboard.type";

//  Mock Data
export const ordersData: Order[] = [
    {
        id: "1",
        orderNumber: "ORD-2026-001",
        date: "2026-05-15",
        status: "delivered",
        total: 1200,
        paymentMethod: "Visa **** 4242",
        billingAddress: "123 Main Street, New York, USA",
        items: [
            { id: "1", title: "HAVIT HV-G92 Gamepad", image: product1, price: 120, quantity: 2 },
            { id: "2", title: "AK-900 Wired Keyboard", image: product2, price: 960, quantity: 1 },
        ],
    },
    {
        id: "2",
        orderNumber: "ORD-2026-002",
        date: "2026-05-28",
        status: "shipped",
        total: 370,
        paymentMethod: "Cash on Delivery",
        billingAddress: "456 Park Avenue, Cairo, Egypt",
        items: [
            { id: "3", title: "IPS LCD Gaming Monitor", image: product3, price: 370, quantity: 1 },
        ],
    },
    {
        id: "3",
        orderNumber: "ORD-2026-003",
        date: "2026-06-01",
        status: "processing",
        total: 635,
        paymentMethod: "Mastercard **** 8888",
        billingAddress: "456 Park Avenue, Cairo, Egypt",
        items: [
            { id: "4", title: "S-Series Comfort Chair", image: product4, price: 375, quantity: 1 },
            { id: "5", title: "The North Coat",         image: product5, price: 260, quantity: 1 },
        ],
    },
    {
        id: "4",
        orderNumber: "ORD-2026-004",
        date: "2026-06-03",
        status: "pending",
        total: 260,
        paymentMethod: "Visa **** 4242",
        billingAddress: "123 Main Street, New York, USA",
        items: [
            { id: "5", title: "The North Coat", image: product5, price: 260, quantity: 1 },
        ],
    },
];

export const reviewsData: Review[] = [
    {
        id: "1",
        productId: "1",
        productTitle: "HAVIT HV-G92 Gamepad",
        productImage: product1,
        rating: 4.5,
        comment: "Excellent gamepad — very comfortable grip and super responsive buttons. Battery life is impressive too. Highly recommend for any gamer.",
        date: "2026-05-20",
        status: "published",
    },
    {
        id: "2",
        productId: "2",
        productTitle: "AK-900 Wired Keyboard",
        productImage: product2,
        rating: 4,
        comment: "Solid keyboard with satisfying tactile feedback. The RGB lighting is a nice touch and the build quality feels premium for the price.",
        date: "2026-05-22",
        status: "pending",
    },
    {
        id: "3",
        productId: "3",
        productTitle: "IPS LCD Gaming Monitor",
        productImage: product3,
        rating: 5,
        comment: "Stunning display with accurate colors and fast response time. Perfect for both gaming and content creation work.",
        date: "2026-06-01",
        status: "rejected",
    },
];

export const paymentMethodsData: PaymentMethod[] = [
    { id: "1", type: "visa",       last4: "4242", holder: "John Doe", expiry: "12/26", isDefault: true  },
    { id: "2", type: "mastercard", last4: "8888", holder: "John Doe", expiry: "08/27", isDefault: false },
];

export const addressesData: Address[] = [
    {
        id: "1",
        fullName: "John Doe",
        phone: "+1 234 567 8900",
        address: "123 Main Street, Apt 4B",
        city: "New York",
        type: "home",
        isDefault: true,
    },
    {
        id: "2",
        fullName: "John Doe",
        phone: "+20 100 000 0000",
        address: "456 Park Avenue, Floor 3",
        city: "Cairo",
        type: "work",
        isDefault: false,
    },
];

//  Tracking Helpers 
export const getTrackingSteps = (status: OrderStatus): TrackingStep[] => [
    {
        id: "1",
        title: "Order Placed",
        description: "Your order has been placed successfully.",
        date: "Jun 1, 2026 — 10:30 AM",
        completed: true,
        current: status === "pending",
    },
    {
        id: "2",
        title: "Order Confirmed",
        description: "The seller has confirmed your order.",
        date: status !== "pending" ? "Jun 2, 2026 — 09:00 AM" : undefined,
        completed: status !== "pending",
        current: status === "processing",
    },
    {
        id: "3",
        title: "Order Shipped",
        description: "Your order has been dispatched for shipping.",
        date: status === "shipped" || status === "delivered" ? "Jun 3, 2026 — 02:15 PM" : undefined,
        completed: status === "shipped" || status === "delivered",
        current: status === "shipped",
    },
    {
        id: "4",
        title: "Out for Delivery",
        description: "Your order is out for delivery today.",
        date: status === "delivered" ? "Jun 4, 2026 — 08:00 AM" : undefined,
        completed: status === "delivered",
        current: false,
    },
    {
        id: "5",
        title: "Delivered",
        description: "Your order has been delivered. Enjoy!",
        date: status === "delivered" ? "Jun 4, 2026 — 02:45 PM" : undefined,
        completed: status === "delivered",
        current: status === "delivered",
    },
];