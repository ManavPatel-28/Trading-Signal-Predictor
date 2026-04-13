import pickle
from .fetch_data import fetch_stock_data
from .features import add_features
from .train_model import FEATURES, train

def predict_signals(ticker: str):
    try:
        with open(f"model_{ticker}.pkl", "rb") as f:
            model = pickle.load(f)
        with open(f"accuracy_{ticker}.txt", "r") as f:
            accuracy = float(f.read())
    except FileNotFoundError:
        model, accuracy = train(ticker)

    df = fetch_stock_data(ticker, period="6mo")
    df = add_features(df)

    df["Prediction"] = model.predict(df[FEATURES])
    df["Confidence"] = model.predict_proba(df[FEATURES])[:, 1]
    df["Signal"] = df["Prediction"].map({1: "BUY", 0: "SELL"})

    result = df[["Close", "Signal", "Confidence"]].tail(60).reset_index()
    result["Date"] = result["Date"].astype(str)

    records = []
    for _, row in result.iterrows():
        records.append({
            "Date": str(row["Date"]),
            "Close": float(row["Close"]),
            "Signal": str(row["Signal"]),
            "Confidence": float(row["Confidence"])
        })
    return records, accuracy