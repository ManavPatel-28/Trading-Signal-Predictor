import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Backtest from "./pages/Backtest";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex gap-4 px-6 pt-4">
        <button onClick={() => setPage("dashboard")} className={`px-4 py-2 rounded-lg text-sm font-medium ${page === "dashboard" ? "bg-green-500 text-white" : "bg-gray-800 text-gray-400"}`}>Dashboard</button>
        <button onClick={() => setPage("backtest")} className={`px-4 py-2 rounded-lg text-sm font-medium ${page === "backtest" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}>Backtest</button>
      </div>
      <main>
        {page === "dashboard" ? <Dashboard /> : <Backtest />}
      </main>
    </div>
  );
}
