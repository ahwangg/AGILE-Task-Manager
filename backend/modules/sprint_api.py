from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
# -----------------------------
# IN-MEMORY STORAGE
# -----------------------------
sprints = {}
tasks = {}
 
# -----------------------------
# SCHEMAS
# -----------------------------
class SprintCreate(BaseModel):
    projectId: str
    name: str
 
class TaskCreate(BaseModel):
    sprintId: int
    name: str
    description: Optional[str] = ""
    priority: Optional[str] = "Low"
    dueDate: Optional[str] = ""
 
class TaskUpdate(BaseModel):
    status: str
 
# -----------------------------
# CREATE SPRINT
# -----------------------------
@app.post("/api/sprint")
def create_sprint(data: SprintCreate):
    sprint_id = len(sprints) + 1
 
    sprints[sprint_id] = {
        "id": sprint_id,
        "projectId": data.projectId,
        "name": data.name,
        "active": False,
        "createdAt": datetime.now().isoformat()
    }
 
    return sprints[sprint_id]
 
 
# -----------------------------
# GET SPRINT
# -----------------------------
@app.get("/api/sprint/{sprint_id}")
def get_sprint(sprint_id: int):
    sprint = sprints.get(sprint_id)
 
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
 
    return sprint
 
 
# -----------------------------
# START SPRINT
# -----------------------------
@app.post("/api/sprint/{sprint_id}/start")
def start_sprint(sprint_id: int):
    sprint = sprints.get(sprint_id)
 
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
 
    sprint["active"] = True
    return sprint
 
 
# -----------------------------
# END SPRINT
# -----------------------------
@app.post("/api/sprint/{sprint_id}/end")
def end_sprint(sprint_id: int):
    sprint = sprints.get(sprint_id)
 
    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")
 
    sprint["active"] = False
    return sprint
 
 
# -----------------------------
# DELETE SPRINT
# -----------------------------
@app.delete("/api/sprint/{sprint_id}")
def delete_sprint(sprint_id: int):
    if sprint_id not in sprints:
        raise HTTPException(status_code=404, detail="Sprint not found")
 
    del sprints[sprint_id]
 
    # also delete related tasks
    keys_to_delete = [k for k, v in tasks.items() if v["sprintId"] == sprint_id]
    for k in keys_to_delete:
        del tasks[k]
 
    return {"message": "Sprint deleted"}
 
 
# -----------------------------
# CREATE TASK
# -----------------------------
@app.post("/api/tasks", status_code=201)
def create_task(data: TaskCreate):
    task_id = len(tasks) + 1
 
    tasks[task_id] = {
        "id": task_id,
        "sprintId": data.sprintId,
        "name": data.name,
        "description": data.description,
        "priority": data.priority,
        "dueDate": data.dueDate,
        "status": "todo",
        "createdAt": datetime.now().isoformat()
    }
 
    return tasks[task_id]
 
 
# -----------------------------
# GET TASKS BY SPRINT
# -----------------------------
@app.get("/api/tasks/{sprint_id}")
def get_tasks(sprint_id: int):
    return [t for t in tasks.values() if t["sprintId"] == sprint_id]
 
 
# -----------------------------
# UPDATE TASK STATUS
# -----------------------------
@app.patch("/api/tasks/{task_id}")
def update_task(task_id: int, data: TaskUpdate):
    task = tasks.get(task_id)
 
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
 
    task["status"] = data.status
    return task
 
 
# -----------------------------
# DELETE TASK
# -----------------------------
@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
 
    del tasks[task_id]
    return {"message": "Task deleted"}