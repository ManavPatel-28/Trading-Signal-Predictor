from sqlalchemy.orm import Session
from . import models

def save_signals(db: Session, signals: list):
    for s in signals:
        db.add(models.Signal(**s))
    db.commit()

def get_signals(db: Session, ticker: str):
    return db.query(models.Signal).filter(models.Signal.ticker == ticker).all()

def save_backtest(db: Session, result: dict):
    db.add(models.BacktestResult(**result))
    db.commit()

def get_backtests(db: Session, ticker: str):
    return db.query(models.BacktestResult).filter(models.BacktestResult.ticker == ticker).all()
