from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import signals, backtest, stocks
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Trading Signal Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stocks.router, prefix="/api")
app.include_router(signals.router, prefix="/api")
app.include_router(backtest.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Trading Signal Predictor API Running"}
