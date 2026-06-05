import { useEffect, useState } from "react";
import axios from "axios";
import { Tag, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, } from "lucide-react";
import { DashBarChart } from "../../components/dashboard/DashboardCharts";
import type { IAdminCategories } from "../../types/dashboard.type";
import { formatMoney } from "../../helpers/dashboard.helper";
import { AdminCategoriesData } from "../../mockData/dashboardData";
import CategoryBadge from "../../components/dashboard/CategoryBadge";

const AdminCategories = () => {
  const [data, setData] = useState<IAdminCategories | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<IAdminCategories>("/api/admin/categories")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(AdminCategoriesData))
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

  const { categories } = data;
  const active = categories.filter((c) => c.status === "active").length;
  const inactive = categories.filter((c) => c.status === "inactive").length;

  const chartData = categories
    .filter((c) => c.status === "active")
    .sort((a, b) => b.totalSales - a.totalSales)
    .map((c) => ({ name: c.name, value: c.totalSales }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Organize your store's product categories.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors cursor-pointer shrink-0">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: categories.length, accent: "bg-primary/10 text-primary" },
          { label: "Active", value: active, accent: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
          { label: "Inactive", value: inactive, accent: "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400" },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex flex-col items-center gap-1">
            <span className={`text-2xl font-bold ${accent.split(" ").pop()}`}>{value}</span>
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <DashBarChart
        data={chartData}
        title="Sales by Category (active only)"
        color="#db4444"
        height={240}
      />

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            All Categories
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-3 py-3 font-medium hidden md:table-cell">Slug</th>
                <th className="text-right px-3 py-3 font-medium">Products</th>
                <th className="text-right px-3 py-3 font-medium hidden sm:table-cell">Total Sales</th>
                <th className="text-right px-3 py-3 font-medium hidden lg:table-cell">Revenue</th>
                <th className="text-left px-3 py-3 font-medium hidden xl:table-cell">Created</th>
                <th className="text-center px-3 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  {/* Name */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Tag size={15} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{cat.name}</p>
                        <p className="text-xs text-gray-400 hidden md:block truncate max-w-[220px]">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="px-3 py-3.5 font-mono text-xs text-gray-400 hidden md:table-cell">
                    {cat.slug}
                  </td>

                  {/* Products */}
                  <td className="px-3 py-3.5 text-right text-gray-600 dark:text-gray-400">
                    {cat.productCount}
                  </td>

                  {/* Sales */}
                  <td className="px-3 py-3.5 text-right text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                    {cat.totalSales.toLocaleString()}
                  </td>

                  {/* Revenue (estimated) */}
                  <td className="px-3 py-3.5 text-right font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                    {formatMoney(cat.totalSales * 120)}
                  </td>

                  {/* Created */}
                  <td className="px-3 py-3.5 text-xs text-gray-400 hidden xl:table-cell">
                    {cat.createdAt}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3.5 text-center">
                    <CategoryBadge status={cat.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors cursor-pointer"
                        title={cat.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {cat.status === "active" ? (
                          <ToggleRight size={15} />
                        ) : (
                          <ToggleLeft size={15} />
                        )}
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCategories
