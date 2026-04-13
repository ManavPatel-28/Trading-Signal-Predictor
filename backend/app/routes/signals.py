from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.ml.predict import predict_signals

router = APIRouter()

@router.get("/signals/{ticker}")
def get_signals(ticker: str, db: Session = Depends(get_db)):
    signals, accuracy = predict_signals(ticker.upper())
    return {"ticker": ticker, "signals": signals, "accuracy": accuracy}