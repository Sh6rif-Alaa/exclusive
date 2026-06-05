import type { LucideIcon } from "lucide-react";

//  Types
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type AddressKind = "home" | "work" | "other";
export type CardType = "visa" | "mastercard" | "amex";
export type ReviewStatus = "pending" | "published" | "rejected";

export interface ChartPoint {
  name: string;
  value: number;
}

export interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  height?: number;
  className?: string;
}

export interface BarProps {
  data: ChartPoint[];
  title: string;
  color?: string;
  prefix?: string;
  height?: number;
}

export interface LineProps {
  data: ChartPoint[];
  title: string;
  color?: string;
  prefix?: string;
  height?: number;
}

export interface PieProps {
  data: ChartPoint[];
  title: string;
  height?: number;
}

export interface StatItem {
  label: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;      // e.g. "+12%" or "-3%"
  positive?: boolean;   // green vs red change
  accent?: string;      // tailwind bg class for icon bg
}

export interface KpiCardProps {
  label: string;
  value: string;
  change?: { value: string | number; positive: boolean };
  icon: React.ElementType;
  accent: string;
  suffix?: string;
}

export interface PaymentMethod {
  id: string;
  type: CardType;
  last4: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  type: AddressKind;
  isDefault: boolean;
}

export interface ITrackingStep {
  id: string;
  title: string;
  description: string;
  date?: string;
  completed: boolean;
  current: boolean;
}

//  Admin Dashboard  →  GET /api/admin/stats

export interface IAdminStats {
  totals: {
    users: number;
    products: number;
    orders: number;
    revenue: number;
    pendingOrders: number;
  };
  ordersByStatus: ChartPoint[];
  revenueByMonth: ChartPoint[];
  ordersByMonth: ChartPoint[];
  salesByCategory: ChartPoint[];
  topProducts: ITopProduct[];
  recentOrders: IRecentOrder[];
}

export interface ITopProduct {
  id: string;
  title: string;
  image: string;
  totalSales: number;
  revenue: number;
  category: string;
}

export interface IRecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
}

//  Admin Products  →  GET /api/admin/products

export interface AdminProduct {
  id: string;
  title: string;
  image: string;
  category: string;
  newPrice: number;
  oldPrice: number;
  discount: number;
  rating: number;
  review: number;
  numberOfSales: number;
  stock: number;          // units in stock
  status: "active" | "draft" | "out_of_stock";
  createdAt: string;
  colors?: string[];
}

export interface IAdminProducts {
  products: AdminProduct[];
  totals: {
    total: number;
    active: number;
    draft: number;
    outOfStock: number;
  };
}

//  Admin Orders  →  GET /api/admin/orders

export interface OrderItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  billingAddress?: string;
  items: OrderItem[] | number;
  paymentMethod: string;
}

export interface IAdminOrders {
  orders: AdminOrder[];
  totals: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

//  Admin Users  →  GET /api/admin/users

export type UserRole = "admin" | "customer";
export type UserStatus = "active" | "inactive" | "banned";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  orders: number;
  totalSpent: number;
  joinedAt: string;
  lastActive: string;
}

export interface IAdminUsers {
  users: IAdminUser[];
  totals: {
    total: number;
    active: number;
    inactive: number;
    banned: number;
    admins: number;
  };
}

//  Admin Categories  →  GET /api/admin/categories

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon | string;
  description: string;
  productCount: number;
  totalSales: number;
  status: "active" | "inactive";
  createdAt: string;
}

//  Admin Analytics  →  GET /api/admin/analytics

export interface IAdminAnalytics {
  kpis: {
    conversionRate: number;
    avgOrderValue: number;
    returnRate: number;
    newUsersThisMonth: number;
    revenueThisMonth: number;
    revenueLastMonth: number;
  };
  revenueByMonth: ChartPoint[];
  ordersByMonth: ChartPoint[];
  salesByCategory: ChartPoint[];
  topProducts: ITopProduct[];
  userGrowthByMonth: ChartPoint[];
}

//  Admin Reviews  →  GET /api/admin/reviews

export interface AdminReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
}

export interface IAdminReviews {
  reviews: AdminReview[];
  totals: {
    total: number;
    pending: number;
    published: number;
    rejected: number;
  };
}

//  Order Tracking Details (for admin to set / user to view)

export interface TrackingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface ModalProps {
  order: AdminOrder;
  tracking: TrackingEvent[];
  onClose: () => void;
  onSave: (id: string, status: OrderStatus, tracking: TrackingEvent[]) => void;
}

//  Admin Settings  →  GET /api/admin/settings

export interface IAdminSettings {
  store: {
    name: string;
    email: string;
    phone: string;
    address: string;
    currency: string;
    timezone: string;
  };
  notifications: {
    emailOnNewOrder: boolean;
    emailOnLowStock: boolean;
    emailOnNewUser: boolean;
    lowStockThreshold: number;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    expressShippingFee: number;
  };
}