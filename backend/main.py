# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modules.database.database import engine
from modules.database.database import Base
# Import ALL models so SQLAlchemy can resolve relationships between them
import modules.project       # loads Project
import modules.sprint        # loads Sprint
 
from modules.project_api import router as project_router
from modules.sprint_api import router as sprint_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(project_router)
app.include_router(sprint_router)