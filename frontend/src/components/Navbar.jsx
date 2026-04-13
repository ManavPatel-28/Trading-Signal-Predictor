export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-green-400">📈 Trading Signal Predictor</h1>
      <span className="text-sm text-gray-400">Powered by XGBoost + React</span>
    </nav>
  );
}
