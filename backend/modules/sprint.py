# sprint.py
from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from modules.database.database import Base
 
class Sprint(Base):
    __tablename__ = "sprints"
 
    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer, nullable=False)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    active = Column(Boolean, default=False)
    total_points = Column(Integer, default=0)
 
    # foreign key → Project
    project_id = Column(Integer, ForeignKey("projects.id"))
 
    # relationship to Task
    #tasks = relationship("Task", backref="sprint", cascade="all, delete")
 
    def startSprint(self) -> bool:
        if not self.active:
            self.active = True
            return True
        return False
 
    def endSprint(self) -> bool:
        if self.active:
            self.active = False
            return True
        return False
 
    def getPoints(self) -> int:
        return self.total_points
 
    def updatePoints(self, points: int):
        self.total_points = points


# # sprint.py
# from datetime import datetime

# class Sprint:
#     def __init__(self, number: int, startDate: datetime, endDate: datetime):
#         # Attributes from UML
#         self.number = number
#         self.startDate = startDate
#         self.endDate = endDate

#         # Track sprint status
#         self.active = False

#         # default point value
#         self.totalPoints = 0

#     # + startSprint(): bool
#     def startSprint(self) -> bool:
#         """
#         Starts the sprint if it is not already active.
#         """
#         if not self.active:
#             self.active = True
#             return True
#         return False

#     # + endSprint(): bool
#     def endSprint(self) -> bool:
#         """
#         Ends the sprint if it is currently active.
#         """
#         if self.active:
#             self.active = False
#             return True
#         return False
    
#     # +getPoints():int
#     def getPoints(self) -> int:
#         return self.totalPoints
    
#     # +updatePoints():void
#     def updatePoints(self, points: int):
#         self.totalPoints = points