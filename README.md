# 📈 Algorithmic Trading Signal Predictor (React, FastAPI, XGBoost, PostgreSQL)

This repository contains a **full-stack AI-powered trading signal application** that fetches real-time stock market data and generates Buy/Sell signals using machine learning.  
The project demonstrates **machine learning, full-stack development, financial data engineering, and database management** using modern technologies.

---

## 🚀 Features

1. **Real-Time Stock Data**
   - Fetch live stock data for any ticker (AAPL, TSLA, NVDA, etc.)
   - Powered by Yahoo Finance API with 6-month historical data

2. **AI-Generated Buy/Sell Signals**
   - XGBoost ML model trained on 2 years of historical data
   - Confidence scores displayed for each signal
   - Model accuracy shown on dashboard

3. **Technical Indicators**
   - RSI, MACD, Bollinger Bands, SMA, EMA
   - Volume change analysis for signal generation

4. **Backtesting Engine**
   - Simulate trading strategy on historical data
   - Metrics: Total Return, Sharpe Ratio, Max Drawdown
   - Interactive P&L curve visualization

5. **Stock Comparison**
   - Compare two stocks side by side on a single chart
   - Visual price comparison with color-coded lines

6. **Export to CSV**
   - Download Buy/Sell signals as a CSV file
   - Includes date, price, signal, and confidence columns

7. **PostgreSQL Database**
   - Stores signals and backtest results
   - Analytics-ready schema with screening views

---

## 🛠 Tech Stack

- **Frontend:** React, Recharts, Tailwind CSS, Axios  
- **Backend:** Python, FastAPI, Uvicorn  
- **Machine Learning:** XGBoost, scikit-learn, pandas, NumPy  
- **Database:** PostgreSQL, SQLAlchemy  
- **Data Source:** Yahoo Finance API (yfinance)  
- **DevTools:** Docker, Git, GitHub, VS Code  

---

## ▶️ How to Run

1. Clone the repository:
```bash
   git clone https://github.com/ManavPatel-28/Trading-Signal-Predictor.git
```

2. Setup PostgreSQL database:
```bash
   psql -U postgres
   CREATE DATABASE tradingdb;
   \q
```

3. Configure environment variables — create `backend/.env`:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/tradingdb

4. Run the backend:
```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
```

5. Run the frontend:
```bash
   cd frontend
   npm install
   npm run dev
```

6. Open your browser at `http://localhost:5173`, enter a ticker like `AAPL` and click **Analyze**

---

## 📂 Implementation Details

- Built a full-stack AI pipeline using React frontend, FastAPI REST API, and PostgreSQL database.
- Engineered an ML pipeline using XGBoost with technical indicators as features: RSI, MACD, Bollinger Bands, SMA, and EMA.
- Implemented a backtesting engine that simulates a trading strategy and computes P&L, Sharpe Ratio, and Max Drawdown.
- Integrated Yahoo Finance API to fetch real-time and historical stock data dynamically for any ticker.
- Stored signals and backtest results in PostgreSQL with SQLAlchemy ORM for analytics and retrieval.
- Added stock comparison feature to visualize two tickers side by side with color-coded price lines.

---

## 🎯 Learning Outcomes

- Full-stack web development with React and FastAPI
- Machine learning model training, evaluation, and deployment
- Financial data engineering and technical indicator computation
- Backtesting strategies and quantitative finance metrics
- RESTful API design and PostgreSQL database integration
- Managing application state and asynchronous data fetching in React

---

## 👨‍💻 Author

**Manav Sachin Patel**
- [LinkedIn](https://www.linkedin.com/in/manav-patel-211467333)  
- [GitHub](https://github.com/ManavPatel-28)
