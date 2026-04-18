# task_db.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from modules.database.database import Base
from datetime import datetime
 
class TaskDB(Base):
    __tablename__ = "tasks"
 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, default="")
    priority = Column(String, default="Low")
    due_date = Column(String, default="")
    status = Column(String, default="todo")
    created_at = Column(DateTime, default=datetime.now)
 
    # foreign key → Sprint
    sprint_id = Column(Integer, ForeignKey("sprints.id"))
 