import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Users, Search, Filter, Eye, Shield, UserX, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { StatTiles } from "../../components/dashboard/DashboardCharts";
import type { IAdminUsers, UserStatus, UserRole } from "../../types/dashboard.type";
import { formatMoney } from "../../helpers/dashboard.helper";
import { AdminUsersData } from "../../mockData/dashboardData";
import UserAvatar from "../../components/dashboard/UserAvatar";

const STATUS_CFG: Record<UserStatus, { label: string; classes: string }> = {
  active: { label: "Active", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  inactive: { label: "Inactive", classes: "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300" },
  banned: { label: "Banned", classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const ROLE_CFG: Record<UserRole, { label: string; classes: string }> = {
  admin: { label: "Admin", classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  customer: { label: "Customer", classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
};

const PAGE_SIZE = 8;

const AdminUsers = () => {
  const [data, setData] = useState<IAdminUsers | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get<IAdminUsers>("/api/admin/users")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setData(res.data);
      })
      .catch(() => setData(AdminUsersData))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || u.status === filterStatus;
      const matchRole = filterRole === "all" || u.role === filterRole;
      return matchSearch && matchStatus && matchRole;
    });
  }, [data, search, filterStatus, filterRole]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const reset = () => setPage(1);

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
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Manage customer accounts and roles.
        </p>
      </div>

      {/* Stat tiles */}
      <StatTiles
        items={[
          { label: "Total Users", value: totals.total.toLocaleString(), icon: Users, accent: "bg-primary/10" },
          { label: "Active", value: totals.active.toLocaleString(), icon: UserCheck, accent: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Inactive", value: totals.inactive, icon: Users, accent: "bg-gray-100 dark:bg-slate-700" },
          { label: "Banned", value: totals.banned, icon: UserX, accent: "bg-red-50 dark:bg-red-900/20" },
        ]}
      />

      {/* Table card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); reset(); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={15} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); reset(); }}
              className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
            <select
              value={filterRole}
              onChange={(e) => { setFilterRole(e.target.value); reset(); }}
              className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
                <th className="text-left px-5 py-3 font-medium">User</th>
                <th className="text-center px-3 py-3 font-medium">Role</th>
                <th className="text-center px-3 py-3 font-medium">Status</th>
                <th className="text-right px-3 py-3 font-medium hidden sm:table-cell">Orders</th>
                <th className="text-right px-3 py-3 font-medium hidden md:table-cell">Total Spent</th>
                <th className="text-left px-3 py-3 font-medium hidden lg:table-cell">Joined</th>
                <th className="text-left px-3 py-3 font-medium hidden xl:table-cell">Last Active</th>
                <th className="text-right px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400 text-sm">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginated.map((user) => {
                  const statusCfg = STATUS_CFG[user.status];
                  const roleCfg = ROLE_CFG[user.role];
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      {/* User */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={user.name} />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-3 py-3.5 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleCfg.classes}`}>
                          {user.role === "admin" && <Shield size={10} />}
                          {roleCfg.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.classes}`}>
                          {statusCfg.label}
                        </span>
                      </td>

                      {/* Orders */}
                      <td className="px-3 py-3.5 text-right text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                        {user.orders}
                      </td>

                      {/* Total Spent */}
                      <td className="px-3 py-3.5 text-right font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell">
                        {formatMoney(user.totalSpent)}
                      </td>

                      {/* Joined */}
                      <td className="px-3 py-3.5 text-xs text-gray-400 hidden lg:table-cell">{user.joinedAt}</td>

                      {/* Last Active */}
                      <td className="px-3 py-3.5 text-xs text-gray-400 hidden xl:table-cell">{user.lastActive}</td>

                      {/* Action */}
                      <td className="px-5 py-3.5 text-right">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
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
    </div>
  );
}

export default AdminUsers;