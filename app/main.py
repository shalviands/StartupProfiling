from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import teams, ai, pdf
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(teams.router)
app.include_router(ai.router)
app.include_router(pdf.router)

@app.get("/")
def read_root():
    return {"status": "online", "project": settings.PROJECT_NAME}

@app.get("/health")
def health_check():
    return {"status": "ok", "timestamp": "..."}

@app.get("/ping")
def ping():
    return "pong"
