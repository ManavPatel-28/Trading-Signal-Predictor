import { useState } from "react";
import { getBacktest } from "../api/client";
import PnLChart from "../components/PnLChart";

export default function Backtest() {
  const [ticker, setTicker] = useState("AAPL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBacktest = async () => {
    setLoading(true);
    try {
      const res = await getBacktest(ticker);
      setResult(res.data);
    } catch (e) {
      alert("Backtest failed.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-3">
        <input
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-40"
          value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          placeholder="e.g. AAPL"
        />
        <button onClick={handleBacktest} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
          {loading ? "Running..." : "Run Backtest"}
        </button>
      </div>
      {result && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400 text-sm">Total Return</p>
              <p className={`text-2xl font-bold ${result.total_return >= 0 ? "text-green-400" : "text-red-400"}`}>{result.total_return}%</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400 text-sm">Sharpe Ratio</p>
              <p className="text-2xl font-bold text-blue-400">{result.sharpe_ratio}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400 text-sm">Max Drawdown</p>
              <p className="text-2xl font-bold text-red-400">{result.max_drawdown}%</p>
            </div>
          </div>
          <PnLChart data={result.pnl_curve} />
        </>
      )}
    </div>
  );
}
