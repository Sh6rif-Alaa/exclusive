import { Smartphone, Laptop, Clock, Camera, Headset, GamepadDirectional, ShieldCheck, Truck, Store, DollarSign, Handbag, BanknoteArrowUp, Shirt, CircleQuestionMark, CreditCard, RotateCcw, UserSearch, Cable, Sofa, Pill, Volleyball, Baby, PawPrint, Droplet } from "lucide-react";
import featone from "../assets/images/feat-1.png";
import featwo from "../assets/images/feat-2.png";
import featthree from "../assets/images/feat-3.png";
import featfour from "../assets/images/feat-4.png";
import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product4 from "../assets/images/product-4.png";
import product5 from "../assets/images/product-5.png";
import product6 from "../assets/images/product-6.png";
import product7 from "../assets/images/product-7.png";
import product8 from "../assets/images/product-8.png";
import product9 from "../assets/images/product-9.png";
import product10 from "../assets/images/product-10.png";
import product11 from "../assets/images/product-11.png";
import product12 from "../assets/images/product-12.png";
import product13 from "../assets/images/product-13.png";
import product14 from "../assets/images/product-14.png";
import product15 from "../assets/images/product-15.png";
import product16 from "../assets/images/product-16.png";
import tomCruse from "../assets/images/image46.png";
import emmaWatson from "../assets/images/image51.png";
import willSmith from "../assets/images/image47.png";
import type { FAQSectionProps } from "../types/components";
import type { AdminCategory, AdminProduct } from "../types/dashboard.type";

// dynamic page data (replace with api data later)
export const productsData: Partial<AdminProduct>[] = [
    {
        id: "1",
        title: "HAVIT HV-G92 Gamepad",
        newPrice: 120,
        oldPrice: 160,
        mainImage: product1,
        discount: 40,
        rating: 4.5,
        review: 88,
        numberOfSales: 450,
        category: "Gaming",
    },
    {
        id: "2",
        title: "AK-900 Wired Keyboard",
        newPrice: 960,
        oldPrice: 1160,
        mainImage: product2,
        discount: 35,
        rating: 4,
        review: 75,
        numberOfSales: 420,
        category: "Computers",
    },
    {
        id: "3",
        title: "IPS LCD Gaming Monitor",
        newPrice: 370,
        oldPrice: 400,
        mainImage: product3,
        discount: 30,
        rating: 4,
        review: 99,
        numberOfSales: 400,
        category: "Computers",
    },
    {
        id: "4",
        title: "S-Series Comfort Chair",
        newPrice: 375,
        oldPrice: 400,
        mainImage: product4,
        discount: 25,
        rating: 4,
        review: 99,
        numberOfSales: 350,
        category: "Home & Lifestyle",
    },
    {
        id: "5",
        title: "The North Coat",
        newPrice: 260,
        oldPrice: 360,
        mainImage: product5,
        discount: 10,
        rating: 5,
        review: 120,
        numberOfSales: 330,
        category: "Men’s Fashion",
    },
    {
        id: "6",
        title: "Gucci Duffle Bag",
        newPrice: 260,
        oldPrice: 360,
        mainImage: product6,
        discount: 10,
        rating: 5,
        review: 120,
        numberOfSales: 200,
        category: "Men’s Fashion",
    },
    {
        id: "7",
        title: "RGB Liquid CPU Cooler",
        newPrice: 260,
        oldPrice: 360,
        mainImage: product7,
        discount: 10,
        rating: 5,
        review: 120,
        numberOfSales: 150,
        category: "Computers",
    },
    {
        id: "8",
        title: "Small Bookshelf",
        newPrice: 260,
        mainImage: product8,
        rating: 5,
        review: 120,
        numberOfSales: 130,
        category: "Home & Lifestyle",
    },
    {
        id: "9",
        title: "Breed Dry Dog Food",
        newPrice: 999,
        mainImage: product9,
        rating: 4.5,
        review: 80,
        numberOfSales: 120,
        category: "Groceries & Pets",
    },
    {
        id: "10",
        title: "CANON EOS DSLR Camera",
        newPrice: 360,
        mainImage: product10,
        rating: 5,
        review: 120,
        numberOfSales: 100,
        category: "Electronics",
    },
    {
        id: "11",
        title: "ASUS FHD Gaming Laptop",
        newPrice: 700,
        mainImage: product11,
        rating: 4,
        review: 325,
        numberOfSales: 90,
        category: "Computers",
    },
    {
        id: "12",
        title: "Curology Product Set",
        newPrice: 500,
        mainImage: product12,
        rating: 4,
        review: 99,
        numberOfSales: 80,
        category: "Health & Beauty",
    },
    {
        id: "13",
        title: "Kids Electric Ride On Car",
        newPrice: 1900,
        mainImage: product13,
        rating: 5,
        review: 350,
        numberOfSales: 60,
        colors: ["bg-prod-1", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"],
        category: "Baby’s & Toys",
    },
    {
        id: "14",
        title: "Jr. Zoom Soccer Cleats",
        newPrice: 1160,
        mainImage: product14,
        rating: 4.5,
        review: 280,
        numberOfSales: 50,
        colors: ["bg-prod-2", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"],
        category: "Sports & Outdoor",
    },
    {
        id: "15",
        title: "GP11 Shooter USB Gamepad",
        newPrice: 660,
        mainImage: product15,
        rating: 4,
        review: 55,
        numberOfSales: 30,
        colors: ["bg-black", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"],
        category: "Gaming",
    },
    {
        id: "16",
        title: "Leather Men's Jacket",
        newPrice: 520,
        mainImage: product16,
        rating: 5,
        review: 80,
        numberOfSales: 20,
        colors: ["bg-prod-3", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"],
        category: "Men’s Fashion",
    },
];

export const categories: Partial<AdminCategory>[] = [
    {
        id: "1",
        name: "Smartphones",
        icon: Smartphone
    },
    {
        id: "2",
        name: "Computers",
        icon: Laptop
    },
    {
        id: "3",
        name: "SmartWatch",
        icon: Clock
    },
    {
        id: "4",
        name: "Camera",
        icon: Camera
    },
    {
        id: "5",
        name: "HeadPhones",
        icon: Headset
    },
    {
        id: "6",
        name: "Gaming",
        icon: GamepadDirectional
    },
    {
        id: "7",
        name: "Woman’s Fashion",
        icon: Handbag
    },
    {
        id: "8",
        name: "Men’s Fashion",
        icon: Shirt
    },
    {
        id: "9",
        name: "Electronics",
        icon: Cable
    },
    {
        id: "10",
        name: "Home & Lifestyle",
        icon: Sofa
    },
    {
        id: "11",
        name: "Medicine",
        icon: Pill
    },
    {
        id: "12",
        name: "Sports & Outdoor",
        icon: Volleyball
    },
    {
        id: "13",
        name: "Baby’s & Toys",
        icon: Baby
    },
    {
        id: "14",
        name: "Groceries & Pets",
        icon: PawPrint
    },
    {
        id: "15",
        name: "Health & Beauty",
        icon: Droplet
    }
]

// static page data
export const featuredCollections = [
    {
        id: 1,
        title: "PlayStation 5",
        description: "Black and White version of the PS5 coming out on sale.",
        image: featone,
    },
    {
        id: 2,
        title: "Women’s Collections",
        description: "Featured woman collections that give you another vibe.",
        image: featwo,
    },
    {
        id: 3,
        title: "Speakers",
        description: "Amazon wireless speakers",
        image: featthree,
    },
    {
        id: 4,
        title: "Perfume",
        description: "GUCCI INTENSE OUD EDP",
        image: featfour,
    },
];

export const servicesData = [
    {
        id: 1,
        title: "Free and Fast Delivery",
        description: "Free delivery for all orders over $140",
        icon: Truck,
    },
    {
        id: 2,
        title: "24/7 Customer Service",
        description: "Friendly 24/7 customer support",
        icon: Headset,
    },
    {
        id: 3,
        title: "Money Back Guarantee",
        description: "We return money within 30 days",
        icon: ShieldCheck,
    },
];

export const ReportData = [
    {
        id: 1,
        title: "Sellers active our site",
        count: "10.5k",
        icon: Store,
    },
    {
        id: 2,
        title: "Monthly Product Sale",
        count: "33k",
        icon: DollarSign,
    },
    {
        id: 3,
        title: "Customer active in our site",
        count: "45.5k",
        icon: Handbag,
    },
    {
        id: 4,
        title: "Annual gross sale in our site",
        count: "25k",
        icon: BanknoteArrowUp,
    },
]

export const aboutData = [
    {
        name: "Tom Cruise",
        position: "Founder & Chairman",
        img: tomCruse,
    },
    {
        name: "Emma Watson",
        position: "Managing Director",
        img: emmaWatson,
    },
    {
        name: "Will Smith",
        position: "Product Designer",
        img: willSmith,
    },
]

export const faqData: FAQSectionProps[] = [
    {
        title: "General Questions",
        icon: CircleQuestionMark,
        questions: [
            {
                question: "What is Exclusive?",
                answer:
                    "Exclusive is an e-commerce platform offering a wide range of quality products including electronics, fashion, home goods, and more.",
            },
            {
                question: "How do I create an account?",
                answer:
                    'Click on "Sign Up" in the navigation menu, fill in your details and create your account.',
            },
            {
                question: "Is it safe to shop on Exclusive?",
                answer:
                    "Yes. We use SSL encryption and secure payment gateways to protect your information.",
            },
        ],
    },

    {
        title: "Orders & Payment",
        icon: CreditCard,
        questions: [
            {
                question: "What payment methods do you accept?",
                answer:
                    "We accept Visa, MasterCard, American Express, PayPal and bank transfers.",
            },
            {
                question: "Can I modify or cancel my order?",
                answer:
                    "You can modify or cancel your order within one hour of placing it.",
            },
            {
                question: "How do I track my order?",
                answer:
                    'You can track your order from the "My Orders" section.',
            },
            {
                question: "Why was my payment declined?",
                answer:
                    "Payment declines can happen due to insufficient funds, incorrect card details, expired cards, or bank restrictions.",
            },
        ],
    },

    {
        title: "Shipping & Delivery",
        icon: Truck,
        questions: [
            {
                question: "What are your shipping options?",
                answer:
                    "We offer Standard, Express and Overnight shipping options.",
            },
            {
                question: "Do you ship internationally?",
                answer:
                    "Yes, we ship to most countries worldwide.",
            },
            {
                question: "What if my package is lost or damaged?",
                answer:
                    "Contact support within 48 hours and we'll investigate the issue.",
            },
        ],
    },

    {
        title: "Returns & Refunds",
        icon: RotateCcw,
        questions: [
            {
                question: "What is your return policy?",
                answer:
                    "Most items can be returned within 30 days of delivery.",
            },
            {
                question: "How do I return an item?",
                answer:
                    'Go to "My Orders" and choose "Request Return".',
            },
            {
                question: "When will I receive my refund?",
                answer:
                    "Refunds are usually processed within 5-10 business days.",
            },
            {
                question: "Can I exchange an item?",
                answer:
                    "Yes, exchanges are available depending on product availability.",
            },
        ],
    },

    {
        title: "Account & Technical",
        icon: UserSearch,
        questions: [
            {
                question: "I forgot my password. What should I do?",
                answer:
                    'Click "Forgot Password" on the login page and follow the instructions.',
            },
            {
                question: "How do I update my account information?",
                answer:
                    'Open "My Account" and update your information.',
            },
            {
                question: "How do I unsubscribe from emails?",
                answer:
                    "Click the unsubscribe link in any marketing email.",
            },
        ],
    },
];

export const privacyData = [
    {
        title: "Introduction",
        paragraphs: [
            "Welcome to Exclusive. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
        ],
    },
    {
        title: "Information We Collect",
        paragraphs: [
            "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
        ],
        list: [
            "Identity Data: First name, last name, username or similar identifier",
            "Contact Data: Email address, telephone numbers, billing and delivery addresses",
            "Financial Data: Bank account and payment card details",
            "Transaction Data: Details about payments and purchased products",
            "Technical Data: IP address, browser type and version, operating system and device information",
            "Profile Data: Username, password, purchases, interests, preferences and feedback",
            "Usage Data: Information about how you use our website and services",
            "Marketing and Communications Data: Marketing preferences and communication settings",
        ],
    },
    {
        title: "How We Use Your Information",
        paragraphs: [
            "We will only use your personal data when the law allows us to.",
        ],
        list: [
            "To register you as a new customer",
            "To process and deliver your orders",
            "To manage our relationship with you",
            "To notify you about changes to our services",
            "To administer and protect our business and website",
            "To improve our products and services",
            "To measure advertising effectiveness",
            "To provide recommendations based on your interests",
        ],
    },
    {
        title: "Data Security",
        paragraphs: [
            "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.",
            "We limit access to your personal data to employees and partners who have a legitimate business need.",
        ],
    },
    {
        title: "Data Retention",
        paragraphs: [
            "We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including legal, regulatory, tax, accounting or reporting requirements.",
        ],
    },
    {
        title: "Your Legal Rights",
        paragraphs: [
            "Under certain circumstances, you have rights under data protection laws in relation to your personal data:",
        ],
        list: [
            "Right to access your personal data",
            "Right to correction of inaccurate data",
            "Right to erasure of your personal data",
            "Right to object to processing",
            "Right to data portability",
            "Right to withdraw consent",
        ],
    },
    {
        title: "Cookies",
        paragraphs: [
            "Our website uses cookies to distinguish you from other users. This helps us provide a better browsing experience and improve our services.",
        ],
    },
    {
        title: "Third-Party Links",
        paragraphs: [
            "This website may include links to third-party websites, plug-ins and applications. We are not responsible for their privacy practices or content.",
        ],
    },
    {
        title: "Changes to This Privacy Policy",
        paragraphs: [
            "We may update this privacy policy from time to time. Any changes will be posted on this page together with the updated revision date.",
        ],
    },
];

export const termsData = [
    {
        title: "Agreement to Terms",
        content: [
            "By accessing and using the Exclusive website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use our services.",
        ],
    },
    {
        title: "Use License",
        content: [
            "Permission is granted to temporarily download one copy of the materials on Exclusive's website for personal, non-commercial transitory viewing only.",
        ],
        list: [
            "Modify or copy the materials",
            "Use the materials for any commercial purpose or for any public display",
            "Attempt to reverse engineer any software contained on Exclusive's website",
            "Remove any copyright or other proprietary notations from the materials",
            'Transfer the materials to another person or "mirror" the materials on any other server',
        ],
    },
    {
        title: "Account Terms",
        content: [
            "When you create an account with us, you must provide information that is accurate, complete, and current at all times.",
        ],
        list: [
            "You are responsible for safeguarding your password",
            "You must not disclose your password to any third party",
            "You must notify us immediately of any unauthorized use of your account",
            "You may not use a username that belongs to another person or entity",
        ],
    },
    {
        title: "Product and Service Terms",
        content: [
            "All products and services are subject to availability. We reserve the right to discontinue any product at any time.",
        ],
        list: [
            "All prices are subject to change without notice",
            "We reserve the right to refuse any order",
            "Product images are displayed as accurately as possible",
            "Actual colors may vary depending on your device",
        ],
    },
    {
        title: "Payment Terms",
        content: [
            "Payment is due immediately upon placing your order. We accept the following forms of payment:",
        ],
        list: [
            "Visa",
            "MasterCard",
            "American Express",
            "Debit Cards",
            "PayPal",
            "Bank Transfer",
        ],
        footer:
            "All payments are processed securely. We do not store your payment card details on our servers.",
    },
    {
        title: "Shipping and Delivery",
        content: [
            "We ship worldwide. Shipping costs and delivery times vary depending on your location and selected shipping method.",
        ],
        list: [
            "Standard Shipping: 5–7 business days",
            "Express Shipping: 2–3 business days",
            "Overnight Shipping: 1 business day",
        ],
        footer:
            "Delivery times are estimates and may be affected by customs or carrier delays.",
    },
    {
        title: "Returns and Refunds",
        content: [
            "You may return most new, unopened items within 30 days of delivery for a full refund.",
        ],
        list: [
            "Items must be returned in original condition",
            "Refunds are processed within 5–10 business days",
            "Perishable items are not eligible for returns",
            "Sale items may not qualify for refunds",
        ],
    },
    {
        title: "Prohibited Uses",
        content: ["You may not use our site:"],
        list: [
            "In violation of any law or regulation",
            "To send unauthorized advertising",
            "To impersonate another person or company",
            "To engage in harmful, illegal, or fraudulent activities",
            "To interfere with other users' enjoyment of the service",
        ],
    },
    {
        title: "Intellectual Property",
        content: [
            "All content, trademarks, logos, and intellectual property displayed on the Service remain the exclusive property of Exclusive and its licensors.",
        ],
    },
    {

        title: "Limitation of Liability",
        content: [
            "Exclusive shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.",
        ],
    },
    {

        title: "Changes to Terms",
        content: [
            "We reserve the right to modify these Terms at any time. Material changes will be communicated in advance whenever possible.",
        ],
    },
    {

        title: "Contact Us",
        content: [
            "If you have any questions regarding these Terms, please contact us:",
        ],
        contacts: [
            "legal@exclusive.com",
            "+88015-88888-9999",
            "111 Bijoy Sarani, Dhaka, Bangladesh",
        ],
    },
];