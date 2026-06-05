import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Package, Plus, Search, Filter, Edit2, Trash2, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { StatTiles } from "../../components/dashboard/DashboardCharts";
import type { AdminProduct, AdminProductsData } from "../../types/dashboard.type";
import { formatMoney } from "../../helpers/dashboard.helper";

const STATUS_CFG = {
  active: {
    label: "Active",
    classes:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  draft: {
    label: "Draft",
    classes:
      "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300",
  },
  out_of_stock: {
    label: "Out of Stock",
    classes:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
} as const;

// Mock data

const MOCK: AdminProductsData = {
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

// Sub-components

function ProductStatusBadge({ status }: { status: AdminProduct["status"] }) {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
      <Star size={12} className="fill-start text-start" />
      {value.toFixed(1)}
    </span>
  );
}

const PAGE_SIZE = 8;

// Page

export default function AdminProducts() {
  const [data, setData] = useState<AdminProductsData | null>(null);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get<AdminProductsData>("/api/admin/products")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(MOCK))
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
                          <StarRating value={product.rating} />
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
