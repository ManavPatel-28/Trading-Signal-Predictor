import yfinance as yf
import pandas as pd

def fetch_stock_data(ticker: str, period: str = "2y") -> pd.DataFrame:
    df = yf.download(ticker, period=period, auto_adjust=True, progress=False)
    df.columns = [col[0] if isinstance(col, tuple) else col for col in df.columns]
    df.dropna(inplace=True)
    return df