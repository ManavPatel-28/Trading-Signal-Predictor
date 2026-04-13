export default function SignalTable({ signals }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl overflow-auto">
      <h2 className="text-white font-semibold mb-3">Recent Signals</h2>
      <table className="w-full text-sm text-gray-300">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700">
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Signal</th>
            <th className="text-left py-2">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {signals.slice(-15).reverse().map((s, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="py-2">{s.Date}</td>
              <td className="py-2">${Number(s.Close).toFixed(2)}</td>
              <td className={`py-2 font-bold ${s.Signal === "BUY" ? "text-green-400" : "text-red-400"}`}>{s.Signal}</td>
              <td className="py-2">{(s.Confidence * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
