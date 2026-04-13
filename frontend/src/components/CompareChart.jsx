import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

export default function CompareChart({ data }) {
  const merged = data.data1.map((item, i) => ({
    Date: item.Date,
    [data.ticker1]: item.Close,
    [data.ticker2]: data.data2[i]?.Close ?? null
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl mt-4">
      <h2 className="text-white font-semibold mb-3">{data.ticker1} vs {data.ticker2} — Price Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={merged}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="Date" tick={{ fill: "#9CA3AF", fontSize: 10 }} tickFormatter={v => v.slice(5)} />
          <YAxis tick={{ fill: "#9CA3AF" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }} />
          <Legend />
          <Line type="monotone" dataKey={data.ticker1} stroke="#34D399" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey={data.ticker2} stroke="#F87171" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}