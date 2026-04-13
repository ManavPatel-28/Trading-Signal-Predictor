import pandas as pd
from app.ml.fetch_data import fetch_stock_data
from app.ml.features import add_features

def run_backtest(ticker: str, initial_capital: float = 10000.0):
    df = fetch_stock_data(ticker, period="2y")
    df = add_features(df)

    capital = initial_capital
    position = 0
    pnl = []

    for i, row in df.iterrows():
        signal = "BUY" if int(row["Target"]) == 1 else "SELL"
        price = float(row["Close"])

        if signal == "BUY" and capital > 0:
            position = capital / price
            capital = 0
        elif signal == "SELL" and position > 0:
            capital = position * price
            position = 0

        portfolio_value = capital + position * price
        pnl.append({"date": str(i.date()), "portfolio_value": round(portfolio_value, 2)})

    final_value = pnl[-1]["portfolio_value"]
    total_return = (final_value - initial_capital) / initial_capital * 100

    values = pd.Series([p["portfolio_value"] for p in pnl])
    daily_returns = values.pct_change().dropna()
    sharpe = (daily_returns.mean() / daily_returns.std()) * (252 ** 0.5)
    rolling_max = values.cummax()
    drawdown = (values - rolling_max) / rolling_max
    max_drawdown = drawdown.min() * 100

    return {
        "ticker": ticker,
        "total_return": round(float(total_return), 2),
        "sharpe_ratio": round(float(sharpe), 2),
        "max_drawdown": round(float(max_drawdown), 2),
        "pnl_curve": pnl
    }