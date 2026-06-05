import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, RotateCcw, Target, ArrowUpRight, } from "lucide-react";
import { DashLineChart, DashBarChart, DashPieChart, } from "../../components/dashboard/DashboardCharts";
import type { AdminAnalyticsData, KpiCardProps } from "../../types/dashboard.type";
import { formatMoney, pctChange } from "../../helpers/dashboard.helper";

// Mock

const MOCK: AdminAnalyticsData = {
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

// Sub-components

function KpiCard({ label, value, change, icon: Icon, accent, suffix }: KpiCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </span>
        <div className={`size-9 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon size={18} className="text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
        {suffix && <span className="text-sm font-normal text-gray-400 ml-1">{suffix}</span>}
      </p>
      {change && (
        <p className={`text-xs font-medium flex items-center gap-1 ${change.positive ? "text-emerald-500" : "text-red-500"}`}>
          {change.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change.positive ? "+" : "-"}{change.value}%{" "}
          <span className="text-gray-400 font-normal">vs last month</span>
        </p>
      )}
    </div>
  );
}

// Page

export default function AdminAnalytics() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<AdminAnalyticsData>("/api/admin/analytics")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(MOCK))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { kpis } = data;
  const revChange = pctChange(kpis.revenueThisMonth, kpis.revenueLastMonth);

  // Order status derived from dashboard data for pie
  const orderStatusData = [
    { name: "Pending", value: 42 },
    { name: "Processing", value: 98 },
    { name: "Shipped", value: 136 },
    { name: "Delivered", value: 3154 },
    { name: "Cancelled", value: 48 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Deep insights into your store's performance.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          label="Revenue This Month"
          value={formatMoney(kpis.revenueThisMonth)}
          change={revChange}
          icon={DollarSign}
          accent="bg-primary/10"
        />
        <KpiCard
          label="Avg. Order Value"
          value={formatMoney(kpis.avgOrderValue)}
          icon={ShoppingCart}
          accent="bg-blue-50 dark:bg-blue-900/20"
        />
        <KpiCard
          label="Conversion Rate"
          value={`${kpis.conversionRate}%`}
          icon={Target}
          accent="bg-purple-50 dark:bg-purple-900/20"
        />
        <KpiCard
          label="New Users (month)"
          value={kpis.newUsersThisMonth.toString()}
          icon={Users}
          accent="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <KpiCard
          label="Return Rate"
          value={`${kpis.returnRate}%`}
          icon={RotateCcw}
          accent="bg-amber-50 dark:bg-amber-900/20"
        />
        <KpiCard
          label="Revenue Last Month"
          value={formatMoney(kpis.revenueLastMonth)}
          icon={ArrowUpRight}
          accent="bg-gray-100 dark:bg-slate-700"
        />
      </div>

      {/* Revenue + Orders trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashLineChart data={data.revenueByMonth} title="Revenue Trend (12 months)" prefix="$" />
        <DashBarChart data={data.ordersByMonth} title="Orders per Month" color="#4a9edb" />
      </div>

      {/* User growth + Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashLineChart data={data.userGrowthByMonth} title="User Growth (12 months)" color="#7b5ea7" />
        <DashBarChart data={data.salesByCategory} title="Sales by Category" color="#db4444" />
      </div>

      {/* Order status pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashPieChart data={orderStatusData} title="Order Status Distribution" />

        {/* Top products table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Top Revenue Products
          </h3>
          <ol className="space-y-3">
            {data.topProducts.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="size-6 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {formatMoney(p.revenue)}
                  </p>
                  <p className="text-xs text-gray-400">{p.totalSales} units</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
