import type { AdminCategory, IAdminAnalytics, IAdminOrders, IAdminProducts, IAdminReviews, IAdminSettings, IAdminStats, IAdminUsers } from "../types/dashboard.type";

export const AdminAnalyticsData: IAdminAnalytics = {
    kpis: {
        conversionRate: 3.8,
        avgOrderValue: 538,
        returnRate: 1.4,
        newUsersThisMonth: 94,
        revenueThisMonth: 28420,
        revenueLastMonth: 24900,
    },
    revenueByMonth: [
        { name: "Jan", value: 11200 }, { name: "Feb", value: 13800 },
        { name: "Mar", value: 15400 }, { name: "Apr", value: 12900 },
        { name: "May", value: 18600 }, { name: "Jun", value: 21300 },
        { name: "Jul", value: 19800 }, { name: "Aug", value: 23100 },
        { name: "Sep", value: 17600 }, { name: "Oct", value: 20400 },
        { name: "Nov", value: 24900 }, { name: "Dec", value: 28420 },
    ],
    ordersByMonth: [
        { name: "Jan", value: 210 }, { name: "Feb", value: 265 },
        { name: "Mar", value: 298 }, { name: "Apr", value: 244 },
        { name: "May", value: 355 }, { name: "Jun", value: 410 },
        { name: "Jul", value: 380 }, { name: "Aug", value: 445 },
        { name: "Sep", value: 338 }, { name: "Oct", value: 392 },
        { name: "Nov", value: 478 }, { name: "Dec", value: 545 },
    ],
    salesByCategory: [
        { name: "Gaming", value: 980 },
        { name: "Computers", value: 1240 },
        { name: "Men's Fashion", value: 620 },
        { name: "Home & Life", value: 430 },
        { name: "Electronics", value: 810 },
        { name: "Groceries", value: 215 },
    ],
    topProducts: [
        { id: "1", title: "AK-900 Wired Keyboard", image: "", totalSales: 420, revenue: 403200, category: "Computers" },
        { id: "2", title: "HAVIT HV-G92 Gamepad", image: "", totalSales: 450, revenue: 54000, category: "Gaming" },
        { id: "3", title: "IPS LCD Gaming Monitor", image: "", totalSales: 400, revenue: 148000, category: "Computers" },
        { id: "4", title: "S-Series Comfort Chair", image: "", totalSales: 350, revenue: 131250, category: "Home & Life" },
        { id: "5", title: "The North Coat", image: "", totalSales: 330, revenue: 85800, category: "Men's Fashion" },
    ],
    userGrowthByMonth: [
        { name: "Jan", value: 62 }, { name: "Feb", value: 78 },
        { name: "Mar", value: 95 }, { name: "Apr", value: 71 },
        { name: "May", value: 108 }, { name: "Jun", value: 134 },
        { name: "Jul", value: 119 }, { name: "Aug", value: 145 },
        { name: "Sep", value: 102 }, { name: "Oct", value: 127 },
        { name: "Nov", value: 158 }, { name: "Dec", value: 94 },
    ],
};

export const AdminCategoriesData: Partial<AdminCategory>[] = [
    { id: "1", name: "Gaming", slug: "gaming", description: "Gaming peripherals, controllers, and accessories.", productCount: 14, totalSales: 980, status: "active", createdAt: "Jan 1, 2025" },
    { id: "2", name: "Computers", slug: "computers", description: "Laptops, desktops, monitors, keyboards, and components.", productCount: 22, totalSales: 1240, status: "active", createdAt: "Jan 1, 2025" },
    { id: "3", name: "Men's Fashion", slug: "mens-fashion", description: "Clothing, shoes, and accessories for men.", productCount: 18, totalSales: 620, status: "active", createdAt: "Feb 15, 2025" },
    { id: "4", name: "Women's Fashion", slug: "womens-fashion", description: "Clothing, shoes, and accessories for women.", productCount: 16, totalSales: 540, status: "active", createdAt: "Feb 15, 2025" },
    { id: "5", name: "Home & Life", slug: "home-life", description: "Furniture, decor, and everyday home products.", productCount: 11, totalSales: 430, status: "active", createdAt: "Mar 3, 2025" },
    { id: "6", name: "Electronics", slug: "electronics", description: "Cameras, audio devices, smart gadgets, and more.", productCount: 19, totalSales: 810, status: "active", createdAt: "Mar 3, 2025" },
    { id: "7", name: "Groceries", slug: "groceries", description: "Food, beverages, and daily essentials.", productCount: 8, totalSales: 215, status: "active", createdAt: "Apr 10, 2025" },
    { id: "8", name: "Sports", slug: "sports", description: "Fitness equipment and outdoor sports gear.", productCount: 10, totalSales: 380, status: "active", createdAt: "Apr 10, 2025" },
    { id: "9", name: "Toys", slug: "toys", description: "Toys and games for children of all ages.", productCount: 6, totalSales: 180, status: "inactive", createdAt: "May 20, 2025" },
];

export const AdminStatsData: IAdminStats = {
    totals: {
        users: 1_240,
        products: 86,
        orders: 3_478,
        revenue: 187_420,
        pendingOrders: 42,
    },
    ordersByStatus: [
        { name: "Pending", value: 42 },
        { name: "Processing", value: 98 },
        { name: "Shipped", value: 136 },
        { name: "Delivered", value: 3_154 },
        { name: "Cancelled", value: 48 },
    ],
    revenueByMonth: [
        { name: "Jan", value: 11_200 },
        { name: "Feb", value: 13_800 },
        { name: "Mar", value: 15_400 },
        { name: "Apr", value: 12_900 },
        { name: "May", value: 18_600 },
        { name: "Jun", value: 21_300 },
        { name: "Jul", value: 19_800 },
        { name: "Aug", value: 23_100 },
        { name: "Sep", value: 17_600 },
        { name: "Oct", value: 20_400 },
        { name: "Nov", value: 24_900 },
        { name: "Dec", value: 28_420 },
    ],
    ordersByMonth: [
        { name: "Jan", value: 210 },
        { name: "Feb", value: 265 },
        { name: "Mar", value: 298 },
        { name: "Apr", value: 244 },
        { name: "May", value: 355 },
        { name: "Jun", value: 410 },
        { name: "Jul", value: 380 },
        { name: "Aug", value: 445 },
        { name: "Sep", value: 338 },
        { name: "Oct", value: 392 },
        { name: "Nov", value: 478 },
        { name: "Dec", value: 545 },
    ],
    salesByCategory: [
        { name: "Gaming", value: 980 },
        { name: "Computers", value: 1_240 },
        { name: "Men's Fashion", value: 620 },
        { name: "Home & Life", value: 430 },
        { name: "Electronics", value: 810 },
        { name: "Groceries", value: 215 },
    ],
    topProducts: [
        { id: "1", title: "AK-900 Wired Keyboard", image: "", totalSales: 420, revenue: 403_200, category: "Computers" },
        { id: "2", title: "HAVIT HV-G92 Gamepad", image: "", totalSales: 450, revenue: 54_000, category: "Gaming" },
        { id: "3", title: "IPS LCD Gaming Monitor", image: "", totalSales: 400, revenue: 148_000, category: "Computers" },
        { id: "4", title: "S-Series Comfort Chair", image: "", totalSales: 350, revenue: 131_250, category: "Home & Life" },
        { id: "5", title: "The North Coat", image: "", totalSales: 330, revenue: 85_800, category: "Men's Fashion" },
    ],
    recentOrders: [
        { id: "1", orderNumber: "ORD-2026-001", customerName: "Ahmed Hassan", date: "Jun 5, 2026", total: 1_200, status: "delivered" },
        { id: "2", orderNumber: "ORD-2026-002", customerName: "Sara Mohamed", date: "Jun 4, 2026", total: 370, status: "shipped" },
        { id: "3", orderNumber: "ORD-2026-003", customerName: "Omar Khalil", date: "Jun 3, 2026", total: 635, status: "processing" },
        { id: "4", orderNumber: "ORD-2026-004", customerName: "Nour El-Din", date: "Jun 2, 2026", total: 260, status: "pending" },
        { id: "5", orderNumber: "ORD-2026-005", customerName: "Layla Abdallah", date: "Jun 1, 2026", total: 960, status: "delivered" },
        { id: "6", orderNumber: "ORD-2026-006", customerName: "Youssef Samir", date: "May 31, 2026", total: 375, status: "cancelled" },
    ],
};

export const AdminOrdersData: IAdminOrders = {
    totals: { total: 3478, pending: 42, processing: 98, shipped: 136, delivered: 3154, cancelled: 48 },
    orders: [
        { id: "1", orderNumber: "ORD-2026-001", customerName: "Ahmed Hassan", customerEmail: "ahmed@example.com", date: "Jun 5, 2026", total: 1200, status: "delivered", items: 3, paymentMethod: "Visa •••• 4242" },
        { id: "2", orderNumber: "ORD-2026-002", customerName: "Sara Mohamed", customerEmail: "sara@example.com", date: "Jun 4, 2026", total: 370, status: "shipped", items: 1, paymentMethod: "Mastercard •••• 8888" },
        { id: "3", orderNumber: "ORD-2026-003", customerName: "Omar Khalil", customerEmail: "omar@example.com", date: "Jun 3, 2026", total: 635, status: "processing", items: 2, paymentMethod: "Cash on Delivery" },
        { id: "4", orderNumber: "ORD-2026-004", customerName: "Nour El-Din", customerEmail: "nour@example.com", date: "Jun 2, 2026", total: 260, status: "pending", items: 1, paymentMethod: "Visa •••• 1111" },
        { id: "5", orderNumber: "ORD-2026-005", customerName: "Layla Abdallah", customerEmail: "layla@example.com", date: "Jun 1, 2026", total: 960, status: "delivered", items: 4, paymentMethod: "Mastercard •••• 5555" },
        { id: "6", orderNumber: "ORD-2026-006", customerName: "Youssef Samir", customerEmail: "youssef@example.com", date: "May 31, 2026", total: 375, status: "cancelled", items: 2, paymentMethod: "Visa •••• 9999" },
        { id: "7", orderNumber: "ORD-2026-007", customerName: "Rana Fawzy", customerEmail: "rana@example.com", date: "May 30, 2026", total: 720, status: "delivered", items: 2, paymentMethod: "Cash on Delivery" },
        { id: "8", orderNumber: "ORD-2026-008", customerName: "Kareem Nasser", customerEmail: "kareem@example.com", date: "May 29, 2026", total: 450, status: "shipped", items: 3, paymentMethod: "Visa •••• 3322" },
        { id: "9", orderNumber: "ORD-2026-009", customerName: "Dina Salah", customerEmail: "dina@example.com", date: "May 28, 2026", total: 185, status: "processing", items: 1, paymentMethod: "Mastercard •••• 7766" },
        { id: "10", orderNumber: "ORD-2026-010", customerName: "Tamer Ibrahim", customerEmail: "tamer@example.com", date: "May 27, 2026", total: 2100, status: "delivered", items: 5, paymentMethod: "Visa •••• 4455" },
        { id: "11", orderNumber: "ORD-2026-011", customerName: "Mona Ashraf", customerEmail: "mona@example.com", date: "May 26, 2026", total: 830, status: "pending", items: 2, paymentMethod: "Cash on Delivery" },
        { id: "12", orderNumber: "ORD-2026-012", customerName: "Sherif Mostafa", customerEmail: "sherif@example.com", date: "May 25, 2026", total: 660, status: "cancelled", items: 3, paymentMethod: "Visa •••• 2233" },
    ],
};

export const AdminProductsData: IAdminProducts = {
    totals: { total: 86, active: 71, draft: 8, outOfStock: 7 },
    products: [
        { id: "1", title: "HAVIT HV-G92 Gamepad", image: "", category: "Gaming", newPrice: 120, oldPrice: 160, discount: 40, rating: 4.5, review: 88, numberOfSales: 450, stock: 34, status: "active", createdAt: "Jan 12, 2026" },
        { id: "2", title: "AK-900 Wired Keyboard", image: "", category: "Computers", newPrice: 960, oldPrice: 1160, discount: 35, rating: 4, review: 75, numberOfSales: 420, stock: 12, status: "active", createdAt: "Jan 14, 2026" },
        { id: "3", title: "IPS LCD Gaming Monitor", image: "", category: "Computers", newPrice: 370, oldPrice: 400, discount: 30, rating: 4, review: 99, numberOfSales: 400, stock: 8, status: "active", createdAt: "Feb 3, 2026" },
        { id: "4", title: "S-Series Comfort Chair", image: "", category: "Home & Life", newPrice: 375, oldPrice: 400, discount: 25, rating: 4, review: 99, numberOfSales: 350, stock: 0, status: "out_of_stock", createdAt: "Feb 10, 2026" },
        { id: "5", title: "The North Coat", image: "", category: "Men's Fashion", newPrice: 260, oldPrice: 360, discount: 10, rating: 5, review: 120, numberOfSales: 330, stock: 22, status: "active", createdAt: "Feb 18, 2026" },
        { id: "6", title: "Gucci Duffle Bag", image: "", category: "Men's Fashion", newPrice: 960, oldPrice: 1160, discount: 17, rating: 4.5, review: 60, numberOfSales: 200, stock: 5, status: "active", createdAt: "Mar 2, 2026" },
        { id: "7", title: "RGB Liquid CPU Cooler", image: "", category: "Computers", newPrice: 160, oldPrice: 170, discount: 6, rating: 4.5, review: 45, numberOfSales: 150, stock: 0, status: "out_of_stock", createdAt: "Mar 8, 2026" },
        { id: "8", title: "Small BookSelf", image: "", category: "Home & Life", newPrice: 360, oldPrice: 400, discount: 10, rating: 5, review: 68, numberOfSales: 140, stock: 18, status: "active", createdAt: "Mar 15, 2026" },
        { id: "9", title: "Breed Dry Dog Food", image: "", category: "Groceries", newPrice: 100, oldPrice: 120, discount: 17, rating: 3, review: 35, numberOfSales: 115, stock: 55, status: "active", createdAt: "Mar 21, 2026" },
        { id: "10", title: "CANON EOS DSLR Camera", image: "", category: "Electronics", newPrice: 360, oldPrice: 420, discount: 14, rating: 4.5, review: 95, numberOfSales: 110, stock: 7, status: "active", createdAt: "Apr 5, 2026" },
        { id: "11", title: "Kids Electric Car", image: "", category: "Toys", newPrice: 960, oldPrice: 1100, discount: 13, rating: 4.5, review: 55, numberOfSales: 95, stock: 3, status: "draft", createdAt: "Apr 12, 2026" },
        { id: "12", title: "Jr. Zoom Soccer Cleats", image: "", category: "Sports", newPrice: 1160, oldPrice: 1200, discount: 3, rating: 5, review: 42, numberOfSales: 88, stock: 28, status: "active", createdAt: "Apr 20, 2026" },
        { id: "13", title: "GP11 Shooter USB Gamepad", image: "", category: "Gaming", newPrice: 660, oldPrice: 750, discount: 12, rating: 4.5, review: 38, numberOfSales: 80, stock: 14, status: "active", createdAt: "May 1, 2026" },
        { id: "14", title: "Quilted Satin Jacket", image: "", category: "Women's Fashion", newPrice: 660, oldPrice: 750, discount: 12, rating: 4.5, review: 33, numberOfSales: 72, stock: 0, status: "out_of_stock", createdAt: "May 7, 2026" },
        { id: "15", title: "Foldable Mini Drone", image: "", category: "Electronics", newPrice: 250, oldPrice: 290, discount: 14, rating: 4, review: 27, numberOfSales: 65, stock: 19, status: "draft", createdAt: "May 14, 2026" },
    ],
};

export const AdminReviewsData: IAdminReviews = {
    totals: { total: 24, pending: 7, published: 14, rejected: 3 },
    reviews: [
        { id: "1", productId: "1", productTitle: "HAVIT HV-G92 Gamepad", productImage: "/product-1.png", customerName: "Ahmed Hassan", customerEmail: "ahmed@example.com", rating: 4.5, comment: "Excellent gamepad — very comfortable grip and super responsive buttons. Battery life is impressive too.", date: "Jun 5, 2026", status: "pending" },
        { id: "2", productId: "2", productTitle: "AK-900 Wired Keyboard", productImage: "/product-2.png", customerName: "Sara Mohamed", customerEmail: "sara@example.com", rating: 4, comment: "Solid keyboard with satisfying tactile feedback. The RGB lighting is a nice touch.", date: "Jun 4, 2026", status: "published" },
        { id: "3", productId: "3", productTitle: "IPS LCD Gaming Monitor", productImage: "/product-3.png", customerName: "Omar Khalil", customerEmail: "omar@example.com", rating: 5, comment: "Stunning display with accurate colors and fast response time. Perfect for both gaming and content creation.", date: "Jun 3, 2026", status: "published" },
        { id: "4", productId: "4", productTitle: "S-Series Comfort Chair", productImage: "/product-4.png", customerName: "Nour El-Din", customerEmail: "nour@example.com", rating: 2, comment: "Very uncomfortable after an hour. The armrests wobble and the cushion is too thin. Not worth the price.", date: "Jun 2, 2026", status: "rejected" },
        { id: "5", productId: "5", productTitle: "Razer DeathAdder Mouse", productImage: "/product-5.png", customerName: "Layla Abdallah", customerEmail: "layla@example.com", rating: 5, comment: "Best mouse I've ever used. The sensor is incredibly precise and the ergonomics are spot on.", date: "Jun 1, 2026", status: "published" },
        { id: "6", productId: "1", productTitle: "HAVIT HV-G92 Gamepad", productImage: "/product-1.png", customerName: "Youssef Samir", customerEmail: "youssef@example.com", rating: 3, comment: "Decent gamepad but the left stick feels a bit loose. Gets the job done for casual gaming though.", date: "May 31, 2026", status: "pending" },
        { id: "7", productId: "6", productTitle: "Bluetooth Speaker JBL", productImage: "/product-6.png", customerName: "Rana Fawzy", customerEmail: "rana@example.com", rating: 4.5, comment: "Incredible sound quality for its size. The bass is punchy and the battery lasts forever.", date: "May 30, 2026", status: "pending" },
        { id: "8", productId: "7", productTitle: "USB-C Hub 7-in-1", productImage: "/product-7.png", customerName: "Kareem Nasser", customerEmail: "kareem@example.com", rating: 4, comment: "Works perfectly with my MacBook. All ports function as expected and the build quality is solid.", date: "May 29, 2026", status: "published" },
        { id: "9", productId: "8", productTitle: "Mechanical Keyboard TKL", productImage: "/product-8.png", customerName: "Dina Salah", customerEmail: "dina@example.com", rating: 5, comment: "The clicky switches are so satisfying. Build quality is outstanding and the RGB effects are beautiful.", date: "May 28, 2026", status: "pending" },
        { id: "10", productId: "9", productTitle: "4K Webcam Logitech", productImage: "/product-9.png", customerName: "Tamer Ibrahim", customerEmail: "tamer@example.com", rating: 4, comment: "Crystal clear video quality. Setup was plug-and-play and the auto-focus works flawlessly.", date: "May 27, 2026", status: "published" },
        { id: "11", productId: "10", productTitle: "Noise Cancelling Headphones", productImage: "/product-10.png", customerName: "Mona Ashraf", customerEmail: "mona@example.com", rating: 1, comment: "Broke after 2 weeks of light use. Customer support was unhelpful. Complete waste of money.", date: "May 26, 2026", status: "rejected" },
        { id: "12", productId: "11", productTitle: "Portable SSD 1TB", productImage: "/product-11.png", customerName: "Sherif Mostafa", customerEmail: "sherif@example.com", rating: 5, comment: "Blazing fast transfer speeds. Fits in my pocket and the build feels premium.", date: "May 25, 2026", status: "pending" },
    ],
};

export const AdminSettingsData: IAdminSettings = {
    store: {
        name: "Exclusive",
        email: "support@exclusive.com",
        phone: "+1 (555) 123-4567",
        address: "123 Commerce Street, New York, NY 10001",
        currency: "USD",
        timezone: "America/New_York",
    },
    notifications: {
        emailOnNewOrder: true,
        emailOnLowStock: true,
        emailOnNewUser: false,
        lowStockThreshold: 5,
    },
    shipping: {
        freeShippingThreshold: 100,
        standardShippingFee: 9.99,
        expressShippingFee: 24.99,
    },
};

export const AdminUsersData: IAdminUsers = {
    totals: { total: 1240, active: 1080, inactive: 110, banned: 50, admins: 4 },
    users: [
        { id: "1", name: "Ahmed Hassan", email: "ahmed@example.com", role: "customer", status: "active", orders: 18, totalSpent: 4200, joinedAt: "Jan 10, 2025", lastActive: "Jun 5, 2026" },
        { id: "2", name: "Sara Mohamed", email: "sara@example.com", role: "customer", status: "active", orders: 12, totalSpent: 2850, joinedAt: "Feb 3, 2025", lastActive: "Jun 4, 2026" },
        { id: "3", name: "Omar Khalil", email: "omar@example.com", role: "customer", status: "active", orders: 7, totalSpent: 1630, joinedAt: "Mar 15, 2025", lastActive: "Jun 3, 2026" },
        { id: "4", name: "Nour El-Din", email: "nour@example.com", role: "customer", status: "inactive", orders: 3, totalSpent: 720, joinedAt: "Apr 22, 2025", lastActive: "Dec 1, 2025" },
        { id: "5", name: "Layla Abdallah", email: "layla@example.com", role: "customer", status: "active", orders: 25, totalSpent: 9100, joinedAt: "Jan 5, 2025", lastActive: "Jun 5, 2026" },
        { id: "6", name: "Youssef Samir", email: "youssef@example.com", role: "customer", status: "banned", orders: 2, totalSpent: 375, joinedAt: "May 18, 2025", lastActive: "May 31, 2026" },
        { id: "7", name: "Rana Fawzy", email: "rana@example.com", role: "customer", status: "active", orders: 9, totalSpent: 2100, joinedAt: "Jun 30, 2025", lastActive: "Jun 2, 2026" },
        { id: "8", name: "Kareem Nasser", email: "kareem@example.com", role: "customer", status: "active", orders: 14, totalSpent: 5500, joinedAt: "Jul 14, 2025", lastActive: "Jun 1, 2026" },
        { id: "9", name: "Dina Salah", email: "dina@example.com", role: "customer", status: "inactive", orders: 1, totalSpent: 185, joinedAt: "Aug 2, 2025", lastActive: "Nov 20, 2025" },
        { id: "10", name: "Tamer Ibrahim", email: "tamer@example.com", role: "customer", status: "active", orders: 31, totalSpent: 14800, joinedAt: "Sep 9, 2025", lastActive: "Jun 5, 2026" },
        { id: "11", name: "Admin User", email: "admin@exclusive.com", role: "admin", status: "active", orders: 0, totalSpent: 0, joinedAt: "Jan 1, 2024", lastActive: "Jun 5, 2026" },
        { id: "12", name: "Mona Ashraf", email: "mona@example.com", role: "customer", status: "active", orders: 6, totalSpent: 1920, joinedAt: "Oct 11, 2025", lastActive: "May 28, 2026" },
    ],
};