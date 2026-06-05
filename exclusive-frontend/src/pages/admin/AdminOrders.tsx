import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ShoppingCart, Search, Filter, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, Truck, RefreshCw, MapPin } from "lucide-react";
import { StatTiles } from "../../components/dashboard/DashboardCharts";
import OrderStatusBadge from "../../components/dashboard/OrderStatusBadge";
import { OrderUpdateModal } from "../../components/dashboard/OrderUpdateModal";
import type { IAdminOrders, AdminOrder, OrderStatus, TrackingEvent } from "../../types/dashboard.type";
import { buildDefaultTracking, formatMoney } from "../../helpers/dashboard.helper";
import { AdminOrdersData } from "../../mockData/dashboardData";
const PAGE_SIZE = 8;

// In-memory tracking store (keyed by order id)
type TrackingStore = Record<string, TrackingEvent[]>;

const AdminOrders = () => {
  const [data, setData] = useState<IAdminOrders | null>(null);
  const [loading, setLoading] = useState(true);
  const [trackingStore, setTrackingStore] = useState<TrackingStore>({});

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    axios
      .get<IAdminOrders>("/api/admin/orders")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(AdminOrdersData))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.orders.filter((o) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || o.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const set = (fn: () => void) => { fn(); setPage(1); };

  const handleSave = (id: string, status: OrderStatus, tracking: TrackingEvent[]) => {
    setData((prev) => {
      if (!prev) return prev;
      const orders = prev.orders.map((o) => (o.id === id ? { ...o, status } : o));
      // recalc totals
      const counts = orders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      return {
        orders,
        totals: {
          total: orders.length,
          pending: counts["pending"] ?? 0,
          processing: counts["processing"] ?? 0,
          shipped: counts["shipped"] ?? 0,
          delivered: counts["delivered"] ?? 0,
          cancelled: counts["cancelled"] ?? 0,
        },
      };
    });
    setTrackingStore((prev) => ({ ...prev, [id]: tracking }));
    // TODO: API  PUT /api/admin/orders/:id  { status, tracking }
  };

  const getTracking = (order: AdminOrder) =>
    trackingStore[order.id] ?? buildDefaultTracking(order.status, order.date);

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
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track and manage all customer orders.</p>
      </div>

      {/* Stat tiles */}
      <StatTiles
        items={[
          { label: "Total Orders", value: totals.total.toLocaleString(), icon: ShoppingCart, accent: "bg-primary/10" },
          { label: "Pending", value: totals.pending, icon: Clock, accent: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Shipped", value: totals.shipped, icon: Truck, accent: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Delivered", value: totals.delivered.toLocaleString(), icon: CheckCircle, accent: "bg-emerald-50 dark:bg-emerald-900/20" },
        ]}
      />

      {/* Status quick-filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: `All (${totals.total})`, icon: RefreshCw },
          { key: "pending", label: `Pending (${totals.pending})`, icon: Clock },
          { key: "processing", label: `Processing (${totals.processing})`, icon: RefreshCw },
          { key: "shipped", label: `Shipped (${totals.shipped})`, icon: Truck },
          { key: "delivered", label: `Delivered (${totals.delivered})`, icon: CheckCircle },
          { key: "cancelled", label: `Cancelled (${totals.cancelled})`, icon: XCircle },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => set(() => setFilterStatus(key))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${filterStatus === key
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
              placeholder="Search by order # or customer…"
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
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
                <th className="text-left px-5 py-3 font-medium">Order #</th>
                <th className="text-left px-3 py-3 font-medium">Customer</th>
                <th className="text-left px-3 py-3 font-medium hidden md:table-cell">Date</th>
                <th className="text-center px-3 py-3 font-medium hidden sm:table-cell">Items</th>
                <th className="text-left px-3 py-3 font-medium hidden lg:table-cell">Payment</th>
                <th className="text-right px-3 py-3 font-medium">Total</th>
                <th className="text-center px-3 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400 text-sm">No orders found.</td>
                </tr>
              ) : (
                paginated.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-500 dark:text-gray-400">{order.orderNumber}</td>
                    <td className="px-3 py-3.5">
                      <p className="font-medium text-gray-800 dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                    </td>
                    <td className="px-3 py-3.5 text-gray-400 text-xs hidden md:table-cell">{order.date}</td>
                    <td className="px-3 py-3.5 text-center text-gray-600 dark:text-gray-400 hidden sm:table-cell">{order.items}</td>
                    <td className="px-3 py-3.5 text-xs text-gray-500 dark:text-gray-400 hidden lg:table-cell">{order.paymentMethod}</td>
                    <td className="px-3 py-3.5 text-right font-semibold text-gray-800 dark:text-white">{formatMoney(order.total)}</td>
                    <td className="px-3 py-3.5 text-center"><OrderStatusBadge status={order.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer ml-auto"
                        title="Update order"
                      >
                        <MapPin size={13} />
                        <span className="hidden sm:inline">Update</span>
                      </button>
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

      {/* Modal */}
      {selectedOrder && (
        <OrderUpdateModal
          order={selectedOrder}
          tracking={getTracking(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default AdminOrders