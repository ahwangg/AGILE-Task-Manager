# sprint_api.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
 
from modules.database.deps import get_db
from modules.sprint import Sprint
 
class SprintCreate(BaseModel):
    project_id: int
    number: int
    name: str = "Sprint"
 
class SprintResponse(BaseModel):
    id: int
    name: str
    number: int
    active: bool
    total_points: int
    project_id: int
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
 
    class Config:
        from_attributes = True
 
router = APIRouter(prefix="/sprints", tags=["sprints"])
 
@router.get("/project/{project_id}", response_model=List[SprintResponse])
def get_sprints_for_project(project_id: int, db: Session = Depends(get_db)):
    return db.query(Sprint).filter(Sprint.project_id == project_id).all()
 
@router.post("/", response_model=SprintResponse)
def create_sprint(data: SprintCreate, db: Session = Depends(get_db)):
    sprint = Sprint(name=data.name, number=data.number, project_id=data.project_id)
    db.add(sprint)
    db.commit()
    db.refresh(sprint)
    return sprint
 
@router.post("/{sprint_id}/start", response_model=SprintResponse)
def start_sprint(sprint_id: int, db: Session = Depends(get_db)):
    sprint = db.query(Sprint).filter(Sprint.id == sprint_id).first()
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
    sprint.active = True
    sprint.start_date = datetime.now()
    db.commit()
    db.refresh(sprint)
    return sprint
 
@router.post("/{sprint_id}/end", response_model=SprintResponse)
def end_sprint(sprint_id: int, db: Session = Depends(get_db)):
    sprint = db.query(Sprint).filter(Sprint.id == sprint_id).first()
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
    sprint.active = False
    sprint.end_date = datetime.now()
    db.commit()
    db.refresh(sprint)
    return sprint
 
@router.delete("/{sprint_id}")
def delete_sprint(sprint_id: int, db: Session = Depends(get_db)):
    sprint = db.query(Sprint).filter(Sprint.id == sprint_id).first()
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
    db.delete(sprint)
    db.commit()
    return {"message": "Sprint deleted"}