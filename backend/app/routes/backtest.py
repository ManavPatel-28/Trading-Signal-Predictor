from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import crud
from app.backtest.engine import run_backtest

router = APIRouter()

@router.get("/backtest/{ticker}")
def backtest(ticker: str, db: Session = Depends(get_db)):
    result = run_backtest(ticker.upper())
    crud.save_backtest(db, {
        "ticker": result["ticker"],
        "start_date": result["pnl_curve"][0]["date"],
        "end_date": result["pnl_curve"][-1]["date"],
        "total_return": result["total_return"],
        "sharpe_ratio": result["sharpe_ratio"],
        "max_drawdown": result["max_drawdown"]
    })
    return result
