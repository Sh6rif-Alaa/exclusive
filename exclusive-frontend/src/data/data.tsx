import { Smartphone, Laptop, Clock, Camera, Headset, GamepadDirectional, ShieldCheck, Truck } from "lucide-react";
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

export const productsData = [
    {
        id: "1",
        title: "HAVIT HV-G92 Gamepad",
        newPrice: 120,
        oldPrice: 160,
        image: product1,
        discount: 40,
        rating: 4.5,
        review: 88,
        numberOfSales: 450,
    },
    {
        id: "2",
        title: "AK-900 Wired Keyboard",
        newPrice: 960,
        oldPrice: 1160,
        image: product2,
        discount: 35,
        rating: 4,
        review: 75,
        numberOfSales: 420,
    },
    {
        id: "3",
        title: "IPS LCD Gaming Monitor",
        newPrice: 370,
        oldPrice: 400,
        image: product3,
        discount: 30,
        rating: 4,
        review: 99,
        numberOfSales: 400,
    },
    {
        id: "4",
        title: "S-Series Comfort Chair",
        newPrice: 375,
        oldPrice: 400,
        image: product4,
        discount: 25,
        rating: 4,
        review: 99,
        numberOfSales: 350,
    },
    {
        id: "5",
        title: "The North Coat",
        newPrice: 260,
        oldPrice: 360,
        image: product5,
        discount: 10,
        rating: 5,
        review: 120,
        numberOfSales: 330,
    },
    {
        id: "6",
        title: "Gucci Duffle Bag",
        newPrice: 260,
        oldPrice: 360,
        image: product6,
        discount: 10,
        rating: 5,
        review: 120,
        numberOfSales: 200,
    },
    {
        id: "7",
        title: "RGB Liquid CPU Cooler",
        newPrice: 260,
        oldPrice: 360,
        image: product7,
        discount: 10,
        rating: 5,
        review: 120,
        numberOfSales: 150,
    },
    {
        id: "8",
        title: "Small Bookshelf",
        newPrice: 260,
        image: product8,
        rating: 5,
        review: 120,
        numberOfSales: 130,
    },
    {
        id: "9",
        title: "Breed Dry Dog Food",
        newPrice: 999,
        image: product9,
        rating: 4.5,
        review: 80,
        numberOfSales: 120,
    },
    {
        id: "10",
        title: "CANON EOS DSLR Camera",
        newPrice: 360,
        image: product10,
        rating: 5,
        review: 120,
        numberOfSales: 100,
    },
    {
        id: "11",
        title: "ASUS FHD Gaming Laptop",
        newPrice: 700,
        image: product11,
        rating: 4,
        review: 325,
        numberOfSales: 90,
    },
    {
        id: "12",
        title: "Curology Product Set",
        newPrice: 500,
        image: product12,
        rating: 4,
        review: 99,
        numberOfSales: 80,
    },
    {
        id: "13",
        title: "Kids Electric Ride On Car",
        newPrice: 1900,
        image: product13,
        rating: 5,
        review: 350,
        numberOfSales: 60,
        color: "bg-prod-1",
    },
    {
        id: "14",
        title: "Jr. Zoom Soccer Cleats",
        newPrice: 1160,
        image: product14,
        rating: 4.5,
        review: 280,
        numberOfSales: 50,
        color: "bg-prod-2",
    },
    {
        id: "15",
        title: "GP11 Shooter USB Gamepad",
        newPrice: 660,
        image: product15,
        rating: 4,
        review: 55,
        numberOfSales: 30,
        color: "bg-black",
    },
    {
        id: "16",
        title: "Leather Men's Jacket",
        newPrice: 520,
        image: product16,
        rating: 5,
        review: 80,
        numberOfSales: 20,
        color: "bg-prod-3",
    },
];

export const categories = [
    {
        id: "1",
        title: "Smartphones",
        icon: <Smartphone className="text-4xl group-hover:text-white transition-colors duration-300" />
    },
    {
        id: "2",
        title: "Computers",
        icon: <Laptop className="text-4xl group-hover:text-white transition-colors duration-300" />
    },
    {
        id: "3",
        title: "SmartWatch",
        icon: <Clock className="text-4xl group-hover:text-white transition-colors duration-300" />
    },
    {
        id: "4",
        title: "Camera",
        icon: <Camera className="text-4xl group-hover:text-white transition-colors duration-300" />
    },
    {
        id: "5",
        title: "HeadPhones",
        icon: <Headset className="text-4xl group-hover:text-white transition-colors duration-300" />
    },
    {
        id: "6",
        title: "Gaming",
        icon: <GamepadDirectional className="text-4xl group-hover:text-white transition-colors duration-300" />
    }
]

export const sidebarCategories = [
    {
        id: "1",
        title: "Woman’s Fashion",
    },
    {
        id: "2",
        title: "Men’s Fashion",
    },
    {
        id: "3",
        title: "Electronics",
    },
    {
        id: "4",
        title: "Home & Lifestyle",
    },
    {
        id: "5",
        title: "Medicine",
    },
    {
        id: "6",
        title: "Sports & Outdoor",
    },
    {
        id: "7",
        title: "Baby’s & Toys",
    },
    {
        id: "8",
        title: "Groceries & Pets",
    },
    {
        id: "9",
        title: "Health & Beauty",
    }
]

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