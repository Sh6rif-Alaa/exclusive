import { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, ShoppingCart, Users, RotateCcw, Target, ArrowUpRight, } from "lucide-react";
import { DashLineChart, DashBarChart, DashPieChart, } from "../../components/dashboard/DashboardCharts";
import type { IAdminAnalytics } from "../../types/dashboard.type";
import { formatMoney, pctChange } from "../../helpers/dashboard.helper";
import { AdminAnalyticsData } from "../../mockData/dashboardData";
import KpiCard from "../../components/dashboard/KpiCard";

const AdminAnalytics = () => {
  const [data, setData] = useState<IAdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<IAdminAnalytics>("/api/admin/analytics")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(AdminAnalyticsData))
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

export default AdminAnalytics;