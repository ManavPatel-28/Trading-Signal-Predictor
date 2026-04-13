from fastapi import APIRouter
from app.ml.fetch_data import fetch_stock_data

router = APIRouter()

@router.get("/stocks/{ticker}")
def get_stock(ticker: str):
    df = fetch_stock_data(ticker, period="6mo")
    df = df.reset_index()
    df["Date"] = df["Date"].astype(str)
    df = df[["Date", "Close", "Volume"]]
    records = [{"Date": row["Date"], "Close": float(row["Close"]), "Volume": float(row["Volume"])} for _, row in df.iterrows()]
    return records

@router.get("/compare/{ticker1}/{ticker2}")
def compare_stocks(ticker1: str, ticker2: str):
    df1 = fetch_stock_data(ticker1.upper(), period="6mo")
    df1 = df1.reset_index()
    df1["Date"] = df1["Date"].astype(str)

    df2 = fetch_stock_data(ticker2.upper(), period="6mo")
    df2 = df2.reset_index()
    df2["Date"] = df2["Date"].astype(str)

    data1 = [{"Date": row["Date"], "Close": float(row["Close"])} for _, row in df1.iterrows()]
    data2 = [{"Date": row["Date"], "Close": float(row["Close"])} for _, row in df2.iterrows()]

    return {"ticker1": ticker1.upper(), "ticker2": ticker2.upper(), "data1": data1, "data2": data2}