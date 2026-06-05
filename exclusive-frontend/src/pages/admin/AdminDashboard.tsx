import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Users, Package, DollarSign, Clock } from "lucide-react";
import { StatTiles, DashBarChart, DashLineChart, DashPieChart } from "../../components/dashboard/DashboardCharts";
import OrderStatusBadge from "../../components/dashboard/OrderStatusBadge";
import type { AdminStats } from "../../types/dashboard.type";
import { formatMoney, formatShort } from "../../helpers/dashboard.helper";

// Mock data (used when API isn't connected yet)
const MOCK_STATS: AdminStats = {
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

//  Page component
export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace base URL when backend is ready
    axios
      .get<AdminStats>("/api/admin/stats")
      .then((res) => {
        if (typeof res.data === "string") {
          throw new Error("API not ready, got HTML instead of JSON");
        }
        setStats(res.data);
      })
      .catch(() => {
        // API not connected yet → use mock data
        setStats(MOCK_STATS);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!stats) return null;

  const { totals, revenueByMonth, ordersByMonth, ordersByStatus, salesByCategory, topProducts, recentOrders } = stats;

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* ── Stat tiles ── */}
      <StatTiles
        items={[
          {
            label: "Total Revenue",
            value: formatShort(totals.revenue),
            icon: DollarSign,
            change: "+8.2%",
            positive: true,
            accent: "bg-primary/10",
          },
          {
            label: "Total Orders",
            value: totals.orders.toLocaleString(),
            icon: ShoppingCart,
            change: "+12.5%",
            positive: true,
            accent: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "Products",
            value: totals.products,
            icon: Package,
            accent: "bg-amber-50 dark:bg-amber-900/20",
          },
          {
            label: "Total Users",
            value: totals.users.toLocaleString(),
            icon: Users,
            change: "+4.1%",
            positive: true,
            accent: "bg-emerald-50 dark:bg-emerald-900/20",
          },
        ]}
      />

      {/* Pending orders alert */}
      {totals.pendingOrders > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          <Clock size={16} className="shrink-0" />
          <span>
            You have{" "}
            <span className="font-semibold">{totals.pendingOrders}</span>{" "}
            pending orders awaiting action.
          </span>
        </div>
      )}

      {/* ── Revenue + Orders trend ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashLineChart
          data={revenueByMonth}
          title="Revenue Trend (12 months)"
          prefix="$"
        />
        <DashBarChart
          data={ordersByMonth}
          title="Orders per Month"
          color="#4a9edb"
        />
      </div>

      {/* ── Category breakdown + Order status ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashBarChart
          data={salesByCategory}
          title="Sales by Category"
          color="#db4444"
        />
        <DashPieChart
          data={ordersByStatus}
          title="Orders by Status"
        />
      </div>

      {/* ── Bottom row: Top Products + Recent Orders ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Top Products */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Top Selling Products
          </h3>
          <ol className="space-y-3">
            {topProducts.map((product, i) => (
              <li
                key={product.id}
                className="flex items-center gap-3"
              >
                <span className="size-6 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {product.totalSales.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">units</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Recent Orders */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
                  <th className="text-left pb-3 font-medium">Order #</th>
                  <th className="text-left pb-3 font-medium">Customer</th>
                  <th className="text-left pb-3 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-right pb-3 font-medium">Total</th>
                  <th className="text-right pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 pr-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 pr-2 font-medium text-gray-800 dark:text-white">
                      {order.customerName}
                    </td>
                    <td className="py-3 pr-2 text-gray-400 text-xs hidden sm:table-cell">
                      {order.date}
                    </td>
                    <td className="py-3 pr-2 text-right font-semibold text-gray-800 dark:text-white">
                      {formatMoney(order.total)}
                    </td>
                    <td className="py-3 text-right">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
