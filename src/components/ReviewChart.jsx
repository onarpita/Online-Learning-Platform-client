import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ReviewChart = ({ distribution }) => {
  if (!distribution) return null;

  const data = Object.keys(distribution)
    .map((key) => ({
      rating: `${key} ★`,
      count: distribution[key],
    }))
    .reverse(); // show 5 stars on top

  const colors = {
    1: "#ef4444",
    2: "#f97316",
    3: "#facc15",
    4: "#4ade80",
    5: "#22c55e",
  };

  return (
    <div className="w-full h-64 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(156, 163, 175, 0.2)"
          />
          <XAxis type="number" tick={{ fill: "#6b7280" }} />
          <YAxis
            dataKey="rating"
            type="category"
            tick={{ fill: "#6b7280", fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(30, 41, 59, 0.9)",
              border: "none",
              color: "white",
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 6, 6]}>
            {data.map((entry) => (
              <Cell
                key={entry.rating}
                fill={colors[entry.rating[0]] || "#3b82f6"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewChart;