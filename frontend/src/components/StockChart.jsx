import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function StockChart({ data }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-white font-semibold mb-3">Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="Date" tick={{ fill: "#9CA3AF", fontSize: 10 }} tickFormatter={v => v.slice(5)} />
          <YAxis tick={{ fill: "#9CA3AF" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }} />
          <Line type="monotone" dataKey="Close" stroke="#34D399" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
