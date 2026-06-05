import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { ChartCardProps, BarProps, LineProps, PieProps, StatItem } from "../../types/dashboard.type";

//  Brand-consistent palette 
const PALETTE = ["#db4444", "#f5a623", "#4a9edb", "#7b5ea7", "#4db8a4", "#e88c5a"];

export function ChartCard({ title, children, height = 260, className = "" }: ChartCardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5 ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {title}
      </h3>
      <div style={{ width: "100%", height }}>{children}</div>
    </div>
  );
}

// Tooltip customisation
function CustomTooltip({ active, payload, label, prefix = "" }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string; prefix?: string; }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg px-3 py-2 text-xs">
      {label && (
        <p className="font-semibold text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </p>
      )}
      {payload.map((p, i) => (
        <p key={i} className="text-gray-800 dark:text-white">
          {prefix}
          {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

//  Bar Chart

export function DashBarChart({ data, title, color = "#db4444", prefix = "", height = 260 }: BarProps) {
  return (
    <ChartCard title={title} height={height}>
      <ResponsiveContainer>
        <BarChart data={data} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip prefix={prefix} />}
            cursor={{ fill: "rgba(219,68,68,0.05)" }}
          />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

//  Line Chart
export function DashLineChart({ data, title, color = "#db4444", prefix = "", height = 260 }: LineProps) {
  return (
    <ChartCard title={title} height={height}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip prefix={prefix} />}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

//  Pie / Donut Chart

export function DashPieChart({ data, title, height = 260 }: PieProps) {
  const pieData = data.map((entry, i) => ({
    ...entry,
    fill: PALETTE[i % PALETTE.length],
  }));

  return (
    <ChartCard title={title} height={height}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            labelLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}


//  Stat Tiles

export function StatTiles({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {item.label}
            </span>
            <div
              className={`size-9 rounded-lg flex items-center justify-center ${item.accent ?? "bg-primary/10"}`}
            >
              <item.icon size={18} className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {item.value}
          </p>
          {item.change && (
            <p
              className={`text-xs font-medium ${item.positive
                ? "text-emerald-500"
                : "text-red-500"
                }`}
            >
              {item.change}{" "}
              <span className="text-gray-400 font-normal">vs last month</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
