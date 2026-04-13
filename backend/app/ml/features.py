import pandas as pd
import numpy as np

def add_features(df: pd.DataFrame) -> pd.DataFrame:
    close = df["Close"].squeeze()
    volume = df["Volume"].squeeze()

    df["SMA_10"] = close.rolling(10).mean()
    df["SMA_50"] = close.rolling(50).mean()
    df["EMA_12"] = close.ewm(span=12).mean()
    df["EMA_26"] = close.ewm(span=26).mean()
    df["MACD"] = df["EMA_12"] - df["EMA_26"]
    df["Signal_Line"] = df["MACD"].ewm(span=9).mean()

    delta = close.diff()
    gain = delta.clip(lower=0).rolling(14).mean()
    loss = -delta.clip(upper=0).rolling(14).mean()
    rs = gain / loss
    df["RSI"] = 100 - (100 / (1 + rs))

    df["BB_Mid"] = close.rolling(20).mean()
    df["BB_Std"] = close.rolling(20).std()
    df["BB_Upper"] = df["BB_Mid"] + 2 * df["BB_Std"]
    df["BB_Lower"] = df["BB_Mid"] - 2 * df["BB_Std"]
    df["Volume_Change"] = volume.pct_change()
    df["Target"] = (close.shift(-1) > close).astype(int)

    df.dropna(inplace=True)
    return df