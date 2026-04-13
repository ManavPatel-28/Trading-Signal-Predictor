import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function PnLChart({ data }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-white font-semibold mb-3">Portfolio P&L</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 10 }} tickFormatter={v => v.slice(5)} />
          <YAxis tick={{ fill: "#9CA3AF" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }} formatter={(v) => [`$${v}`, "Portfolio"]} />
          <Area type="monotone" dataKey="portfolio_value" stroke="#60A5FA" fill="#1D4ED8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
