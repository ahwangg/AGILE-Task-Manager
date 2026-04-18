# task_api.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from modules.database.deps import get_db
from modules.task_db import TaskDB as Task

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
    due_date: Optional[str] = ""
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
        due_date=data.dueDate,
        status="todo",
        sprint_id=data.sprintId,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

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