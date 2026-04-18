# models.py
from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
 
 
class Project(Base):
    __tablename__ = "projects"
 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
 
    sprints = relationship("Sprint", backref="project", cascade="all, delete")
 
 
class Sprint(Base):
    __tablename__ = "sprints"
 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, default="Sprint") 
    number = Column(Integer, nullable=False)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    active = Column(Boolean, default=False)
    total_points = Column(Integer, default=0)
 
    project_id = Column(Integer, ForeignKey("projects.id"))
 
    tasks = relationship("Task", backref="sprint", cascade="all, delete")
 
 
class Task(Base):
    __tablename__ = "tasks"
 
    id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String, nullable=False)
    task_description = Column(String)
    status = Column(String, default="todo")
    priority = Column(String, default="Low")
    due_date = Column(DateTime)
    is_archived = Column(Boolean, default=False)
 
    sprint_id = Column(Integer, ForeignKey("sprints.id"))  # ← added