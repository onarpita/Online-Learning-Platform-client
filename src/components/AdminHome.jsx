import React from "react";
import { BarChart3, Construction, Rocket, Timer, Zap } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
  const revenueData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* --- UNDER CONSTRUCTION HEADER --- */}
      <div className="relative overflow-hidden bg-primary text-primary-content p-8 rounded-3xl shadow-lg border border-primary/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="badge badge-secondary gap-1 animate-pulse">
                <Timer size={14} /> Coming Soon
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">
              Building Something Great.
            </h1>
            <p className="opacity-80 max-w-md">
              We're currently fine-tuning your analytics engine. New modules for
              inventory management and AI insights are arriving shortly.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md animate-bounce">
              <Rocket size={40} />
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md animate-spin-slow">
              <Construction size={40} />
            </div>
          </div>
        </div>

        {/* Background Decorative Circles */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs uppercase font-bold text-gray-500">
              Total Sales
            </div>
            <div className="stat-value text-primary">$24.5k</div>
            <div className="stat-desc text-success font-medium">
              ↗︎ 400 (22%)
            </div>
          </div>
        </div>

        {/* Skeleton Stat Card (Placeholder for upcoming data) */}
        <div className="stats shadow bg-base-100 border-2 border-dashed border-base-300">
          <div className="stat opacity-50">
            <div className="stat-title text-xs uppercase font-bold flex items-center gap-2">
              User Growth{" "}
              <Zap size={12} className="text-warning fill-warning" />
            </div>
            <div className="h-8 w-24 bg-base-300 rounded animate-pulse mt-2"></div>
            <div className="stat-desc">Computing data...</div>
          </div>
        </div>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" /> Sales Analytics
          </h3>
          <span className="text-xs font-mono bg-base-200 px-2 py-1 rounded">
            v0.1.5-beta
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                fill="url(#colorSales)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;