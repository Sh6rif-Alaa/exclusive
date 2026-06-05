import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Search, Filter, Clock, ChevronLeft, ChevronRight, MessageSquare, Eye, EyeOff, } from "lucide-react";
import { StatTiles } from "../../components/dashboard/DashboardCharts";
import type { IAdminReviews, ReviewStatus } from "../../types/dashboard.type";
import { AdminReviewsData } from "../../mockData/dashboardData";
import ReviewRow from "../../components/dashboard/ReviewRow";

const PAGE_SIZE = 8;

const AdminReviews = () => {
  const [data, setData] = useState<IAdminReviews | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get<IAdminReviews>("/api/admin/reviews")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(AdminReviewsData))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id: string, status: ReviewStatus) => {
    setData((prev) => {
      if (!prev) return prev;
      const reviews = prev.reviews.map((r) => (r.id === id ? { ...r, status } : r));
      const counts = reviews.reduce((acc, r) => { acc[r.status] = (acc[r.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);
      return {
        reviews,
        totals: {
          total: reviews.length,
          pending: counts["pending"] ?? 0,
          published: counts["published"] ?? 0,
          rejected: counts["rejected"] ?? 0,
        },
      };
    });
    // TODO: API  PATCH /api/admin/reviews/:id  { status }
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.reviews.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        r.productTitle.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || r.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const set = (fn: () => void) => { fn(); setPage(1); };

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
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Reviews</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Moderate customer reviews before they go live.</p>
      </div>

      {/* Stat tiles */}
      <StatTiles
        items={[
          { label: "Total Reviews", value: totals.total, icon: MessageSquare, accent: "bg-primary/10" },
          { label: "Pending", value: totals.pending, icon: Clock, accent: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Published", value: totals.published, icon: Eye, accent: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Rejected", value: totals.rejected, icon: EyeOff, accent: "bg-red-50 dark:bg-red-900/20" },
        ]}
      />

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: `All (${totals.total})` },
          { key: "pending", label: `Pending (${totals.pending})` },
          { key: "published", label: `Published (${totals.published})` },
          { key: "rejected", label: `Rejected (${totals.rejected})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => set(() => setFilterStatus(key))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${filterStatus === key
              ? "bg-primary text-white border-primary"
              : "border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product, customer, or comment…"
              value={search}
              onChange={(e) => set(() => setSearch(e.target.value))}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={15} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => set(() => setFilterStatus(e.target.value))}
              className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Reviews list */}
        <div className="divide-y divide-gray-50 dark:divide-slate-700">
          {paginated.length === 0 ? (
            <p className="text-center py-10 text-gray-400 text-sm">No reviews found.</p>
          ) : (
            paginated.map((review) => (
              <ReviewRow key={review.id} review={review} onUpdate={updateStatus} />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-slate-700">
            <p className="text-xs text-gray-400">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`size-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${n === page ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700"}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminReviews;