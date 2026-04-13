import { useState } from "react";
import { getStockData, getSignals, compareStocks } from "../api/client";
import StockChart from "../components/StockChart";
import SignalTable from "../components/SignalTable";
import CompareChart from "../components/CompareChart";

export default function Dashboard() {
  const [ticker, setTicker] = useState("AAPL");
  const [ticker2, setTicker2] = useState("TSLA");
  const [stockData, setStockData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [compareData, setCompareData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compareLoading, setCompareLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const [stock, sig] = await Promise.all([getStockData(ticker), getSignals(ticker)]);
      setStockData(stock.data);
      setSignals(sig.data.signals);
      setAccuracy(sig.data.accuracy);
    } catch (e) {
      alert("Error fetching data. Check ticker or backend.");
    }
    setLoading(false);
  };

  const handleCompare = async () => {
    setCompareLoading(true);
    try {
      const res = await compareStocks(ticker, ticker2);
      setCompareData(res.data);
    } catch (e) {
      alert("Error comparing stocks.");
    }
    setCompareLoading(false);
  };

  const exportCSV = () => {
    if (!signals.length) return;
    const header = "Date,Price,Signal,Confidence\n";
    const rows = signals.map(s => `${s.Date},${s.Close},${s.Signal},${(s.Confidence * 100).toFixed(1)}%`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticker}_signals.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Analyze Section */}
      <div className="flex gap-3 items-center flex-wrap">
        <input
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-36"
          value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          placeholder="e.g. AAPL"
        />
        <button onClick={handleSearch} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
          {loading ? "Loading..." : "Analyze"}
        </button>
        {signals.length > 0 && (
          <button onClick={exportCSV} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold">
            Export CSV
          </button>
        )}
        {accuracy !== null && (
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-600">
            <span className="text-gray-400 text-sm">Model Accuracy: </span>
            <span className="text-blue-400 font-bold">{accuracy}%</span>
          </div>
        )}
      </div>

      {stockData.length > 0 && <StockChart data={stockData} />}
      {signals.length > 0 && <SignalTable signals={signals} />}

      {/* Compare Section */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="text-white font-semibold text-lg mb-3">Compare Two Stocks</h2>
        <div className="flex gap-3 items-center flex-wrap">
          <input
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-36"
            value={ticker}
            onChange={e => setTicker(e.target.value.toUpperCase())}
            placeholder="Ticker 1"
          />
          <span className="text-gray-400 font-bold">vs</span>
          <input
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-36"
            value={ticker2}
            onChange={e => setTicker2(e.target.value.toUpperCase())}
            placeholder="Ticker 2"
          />
          <button onClick={handleCompare} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">
            {compareLoading ? "Loading..." : "Compare"}
          </button>
        </div>
        {compareData && <CompareChart data={compareData} />}
      </div>
    </div>
  );
}