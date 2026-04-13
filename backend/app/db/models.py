from sqlalchemy import Column, Integer, String, Float, DateTime
from .database import Base
import datetime

class Signal(Base):
    __tablename__ = "signals"
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String)
    date = Column(DateTime)
    close_price = Column(Float)
    signal = Column(String)
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class BacktestResult(Base):
    __tablename__ = "backtest_results"
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    total_return = Column(Float)
    sharpe_ratio = Column(Float)
    max_drawdown = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
