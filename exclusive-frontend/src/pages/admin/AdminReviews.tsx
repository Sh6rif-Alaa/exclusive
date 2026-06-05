import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Star, Search, Filter, CheckCircle, XCircle, Clock,
  ChevronLeft, ChevronRight, MessageSquare, Eye, EyeOff,
} from "lucide-react";
import { StatTiles } from "../../components/dashboard/DashboardCharts";
import type { AdminReviewsData, AdminReview, ReviewStatus } from "../../types/dashboard.type";

// ─── Mock ────────────────────────────────────────────────────────────────────

const MOCK: AdminReviewsData = {
  totals: { total: 24, pending: 7, published: 14, rejected: 3 },
  reviews: [
    { id:"1",  productId:"1",  productTitle:"HAVIT HV-G92 Gamepad",      productImage:"/product-1.png", customerName:"Ahmed Hassan",  customerEmail:"ahmed@example.com",  rating:4.5, comment:"Excellent gamepad — very comfortable grip and super responsive buttons. Battery life is impressive too.",       date:"Jun 5, 2026",  status:"pending"   },
    { id:"2",  productId:"2",  productTitle:"AK-900 Wired Keyboard",      productImage:"/product-2.png", customerName:"Sara Mohamed",  customerEmail:"sara@example.com",   rating:4,   comment:"Solid keyboard with satisfying tactile feedback. The RGB lighting is a nice touch.",                            date:"Jun 4, 2026",  status:"published" },
    { id:"3",  productId:"3",  productTitle:"IPS LCD Gaming Monitor",     productImage:"/product-3.png", customerName:"Omar Khalil",   customerEmail:"omar@example.com",   rating:5,   comment:"Stunning display with accurate colors and fast response time. Perfect for both gaming and content creation.",   date:"Jun 3, 2026",  status:"published" },
    { id:"4",  productId:"4",  productTitle:"S-Series Comfort Chair",     productImage:"/product-4.png", customerName:"Nour El-Din",   customerEmail:"nour@example.com",   rating:2,   comment:"Very uncomfortable after an hour. The armrests wobble and the cushion is too thin. Not worth the price.",       date:"Jun 2, 2026",  status:"rejected"  },
    { id:"5",  productId:"5",  productTitle:"Razer DeathAdder Mouse",     productImage:"/product-5.png", customerName:"Layla Abdallah",customerEmail:"layla@example.com",  rating:5,   comment:"Best mouse I've ever used. The sensor is incredibly precise and the ergonomics are spot on.",                date:"Jun 1, 2026",  status:"published" },
    { id:"6",  productId:"1",  productTitle:"HAVIT HV-G92 Gamepad",      productImage:"/product-1.png", customerName:"Youssef Samir", customerEmail:"youssef@example.com",rating:3,   comment:"Decent gamepad but the left stick feels a bit loose. Gets the job done for casual gaming though.",             date:"May 31, 2026", status:"pending"   },
    { id:"7",  productId:"6",  productTitle:"Bluetooth Speaker JBL",      productImage:"/product-6.png", customerName:"Rana Fawzy",    customerEmail:"rana@example.com",   rating:4.5, comment:"Incredible sound quality for its size. The bass is punchy and the battery lasts forever.",                   date:"May 30, 2026", status:"pending"   },
    { id:"8",  productId:"7",  productTitle:"USB-C Hub 7-in-1",           productImage:"/product-7.png", customerName:"Kareem Nasser", customerEmail:"kareem@example.com", rating:4,   comment:"Works perfectly with my MacBook. All ports function as expected and the build quality is solid.",             date:"May 29, 2026", status:"published" },
    { id:"9",  productId:"8",  productTitle:"Mechanical Keyboard TKL",    productImage:"/product-8.png", customerName:"Dina Salah",    customerEmail:"dina@example.com",   rating:5,   comment:"The clicky switches are so satisfying. Build quality is outstanding and the RGB effects are beautiful.",       date:"May 28, 2026", status:"pending"   },
    { id:"10", productId:"9",  productTitle:"4K Webcam Logitech",         productImage:"/product-9.png", customerName:"Tamer Ibrahim", customerEmail:"tamer@example.com",  rating:4,   comment:"Crystal clear video quality. Setup was plug-and-play and the auto-focus works flawlessly.",                 date:"May 27, 2026", status:"published" },
    { id:"11", productId:"10", productTitle:"Noise Cancelling Headphones",productImage:"/product-10.png",customerName:"Mona Ashraf",   customerEmail:"mona@example.com",   rating:1,   comment:"Broke after 2 weeks of light use. Customer support was unhelpful. Complete waste of money.",                date:"May 26, 2026", status:"rejected"  },
    { id:"12", productId:"11", productTitle:"Portable SSD 1TB",           productImage:"/product-11.png",customerName:"Sherif Mostafa",customerEmail:"sherif@example.com", rating:5,   comment:"Blazing fast transfer speeds. Fits in my pocket and the build feels premium.",                              date:"May 25, 2026", status:"pending"   },
  ],
};

// ─── Stars ────────────────────────────────────────────────────────────────────

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          className={n <= Math.round(value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{value}</span>
    </div>
  );
}

// ─── Review Status Badge ──────────────────────────────────────────────────────

const statusCfg: Record<ReviewStatus, { label: string; classes: string }> = {
  pending:   { label: "Pending",   classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  published: { label: "Published", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  rejected:  { label: "Rejected",  classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  const cfg = statusCfg[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

export default function AdminReviews() {
  const [data, setData] = useState<AdminReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get<AdminReviewsData>("/api/admin/reviews")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(MOCK))
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
          pending:   counts["pending"]   ?? 0,
          published: counts["published"] ?? 0,
          rejected:  counts["rejected"]  ?? 0,
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
          { label: "Total Reviews", value: totals.total,     icon: MessageSquare, accent: "bg-primary/10"                          },
          { label: "Pending",       value: totals.pending,   icon: Clock,         accent: "bg-amber-50 dark:bg-amber-900/20"       },
          { label: "Published",     value: totals.published, icon: Eye,           accent: "bg-emerald-50 dark:bg-emerald-900/20"   },
          { label: "Rejected",      value: totals.rejected,  icon: EyeOff,        accent: "bg-red-50 dark:bg-red-900/20"           },
        ]}
      />

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all",       label: `All (${totals.total})`           },
          { key: "pending",   label: `Pending (${totals.pending})`     },
          { key: "published", label: `Published (${totals.published})` },
          { key: "rejected",  label: `Rejected (${totals.rejected})`   },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => set(() => setFilterStatus(key))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              filterStatus === key
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

// ─── Review Row ───────────────────────────────────────────────────────────────

function ReviewRow({ review, onUpdate }: { review: AdminReview; onUpdate: (id: string, s: ReviewStatus) => void }) {
  return (
    <div className="flex gap-4 p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
      {/* Product image */}
      <div className="size-12 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
        <img
          src={review.productImage}
          alt={review.productTitle}
          className="w-full h-full object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div>
            <p className="font-medium text-sm text-gray-800 dark:text-white truncate">{review.productTitle}</p>
            <p className="text-xs text-gray-400">{review.customerName} · {review.customerEmail}</p>
          </div>
          <ReviewStatusBadge status={review.status} />
        </div>
        <StarRating value={review.rating} />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">{review.comment}</p>
        <p className="text-xs text-gray-400 mt-1">{review.date}</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 shrink-0 justify-center">
        {review.status !== "published" && (
          <button
            onClick={() => onUpdate(review.id, "published")}
            title="Publish"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
          >
            <CheckCircle size={13} /> Publish
          </button>
        )}
        {review.status !== "rejected" && (
          <button
            onClick={() => onUpdate(review.id, "rejected")}
            title="Reject"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
          >
            <XCircle size={13} /> Reject
          </button>
        )}
        {review.status !== "pending" && (
          <button
            onClick={() => onUpdate(review.id, "pending")}
            title="Set Pending"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors cursor-pointer"
          >
            <Clock size={13} /> Pending
          </button>
        )}
      </div>
    </div>
  );
}
