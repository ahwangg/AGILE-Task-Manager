# task_api.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from modules.database.deps import get_db
from modules.database.models import Task
from modules.database.models import Sprint

# --- Pydantic Schemas ---
class TaskCreate(BaseModel):
    sprintId: int
    name: str
    description: Optional[str] = ""
    priority: Optional[str] = "Low"
    dueDate: Optional[str] = ""

class TaskUpdate(BaseModel):
    status: str

class TaskResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = ""
    priority: Optional[str] = "Low"
    due_date: Optional[datetime] = None
    status: str
    sprint_id: int

    class Config:
        from_attributes = True

# --- Router ---
router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.post("/", status_code=201, response_model=TaskResponse)
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    task = Task(
        name=data.name,
        description=data.description,
        priority=data.priority,
        due_date=datetime.strptime(data.dueDate, "%Y-%m-%d") if data.dueDate else None,
        status="todo",
        sprint_id=data.sprintId,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.get("/project/{project_id}", response_model=List[TaskResponse])
def get_tasks_by_project(project_id: int, db: Session = Depends(get_db)):
    return db.query(Task).join(Sprint).filter(Sprint.project_id == project_id).all()

@router.get("/{sprint_id}", response_model=List[TaskResponse])
def get_tasks(sprint_id: int, db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.sprint_id == sprint_id).all()

@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, data: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = data.status
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}