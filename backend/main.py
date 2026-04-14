from fastapi import FastAPI
from backend.modules.database.database import engine
from backend.modules.database.models import Base

app = FastAPI()

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)