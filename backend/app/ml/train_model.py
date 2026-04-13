import pickle
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from .fetch_data import fetch_stock_data
from .features import add_features

FEATURES = ["SMA_10","SMA_50","MACD","Signal_Line","RSI","BB_Upper","BB_Lower","Volume_Change"]

def train(ticker: str = "AAPL"):
    df = fetch_stock_data(ticker)
    df = add_features(df)

    X = df[FEATURES]
    y = df["Target"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    model = XGBClassifier(n_estimators=100, max_depth=4, learning_rate=0.1, eval_metric="logloss")
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    acc = round(float(accuracy_score(y_test, preds)) * 100, 2)

    with open(f"model_{ticker}.pkl", "wb") as f:
        pickle.dump(model, f)

    with open(f"accuracy_{ticker}.txt", "w") as f:
        f.write(str(acc))

    return model, acc