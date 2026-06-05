import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Package, Plus, Search, Filter, Edit2, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { StatTiles } from "../../components/dashboard/DashboardCharts";
import type { IAdminProducts } from "../../types/dashboard.type";
import { formatMoney } from "../../helpers/dashboard.helper";
import { AdminProductsData } from "../../mockData/dashboardData";
import ProductStatusBadge from "../../components/dashboard/ProductStatusBadge";
import { Rating } from "react-simple-star-rating";


const PAGE_SIZE = 8;

const AdminProducts = () => {
  const [data, setData] = useState<IAdminProducts | null>(null);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get<IAdminProducts>("/api/admin/products")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(AdminProductsData))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.products.map((p) => p.category)));
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.products.filter((p) => {
      const matchSearch =
        !search || p.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || p.status === filterStatus;
      const matchCat =
        filterCategory === "all" || p.category === filterCategory;
      return matchSearch && matchStatus && matchCat;
    });
  }, [data, search, filterStatus, filterCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // reset page on filter change
  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleStatus = (v: string) => { setFilterStatus(v); setPage(1); };
  const handleCategory = (v: string) => { setFilterCategory(v); setPage(1); };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { totals } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your store's product catalog.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors cursor-pointer shrink-0">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Stat tiles */}
      <StatTiles
        items={[
          { label: "Total Products", value: totals.total, icon: Package, accent: "bg-primary/10" },
          { label: "Active", value: totals.active, icon: Package, accent: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Draft", value: totals.draft, icon: Package, accent: "bg-gray-100 dark:bg-slate-700" },
          { label: "Out of Stock", value: totals.outOfStock, icon: Package, accent: "bg-red-50 dark:bg-red-900/20" },
        ]}
      />

      {/* Table card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={15} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => handleStatus(e.target.value)}
              className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => handleCategory(e.target.value)}
              className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-3 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="text-right px-3 py-3 font-medium">Price</th>
                <th className="text-right px-3 py-3 font-medium hidden sm:table-cell">Stock</th>
                <th className="text-right px-3 py-3 font-medium hidden lg:table-cell">Sales</th>
                <th className="text-center px-3 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                paginated.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="size-10 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="size-10 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                            <Package size={16} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white truncate max-w-[180px]">
                            {product.title}
                          </p>
                          <Rating
                            readonly
                            initialValue={product.rating}
                            size={12}
                            allowFraction
                            SVGclassName="inline-block"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-3.5 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-3 py-3.5 text-right">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {formatMoney(product.newPrice)}
                      </p>
                      {product.discount > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatMoney(product.oldPrice)}
                        </p>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-3 py-3.5 text-right hidden sm:table-cell">
                      <span
                        className={`font-medium ${product.stock === 0
                          ? "text-red-500"
                          : product.stock <= 5
                            ? "text-amber-500"
                            : "text-gray-700 dark:text-gray-300"
                          }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    {/* Sales */}
                    <td className="px-3 py-3.5 text-right text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                      {product.numberOfSales.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3.5 text-center">
                      <ProductStatusBadge status={product.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer" title="View">
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer" title="Edit">
                          <Edit2 size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-slate-700">
            <p className="text-xs text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {filtered.length}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`size-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${n === page
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts