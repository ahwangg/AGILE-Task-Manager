# project.py
from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from modules.database.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # relationship to Sprint
    #sprints = relationship("Sprint", backref="project", cascade="all, delete")



    # + createSprint(): void
    # def createSprint(self) -> None:
    #     """
    #     Creates a new sprint and adds it to the project.
    #     For now, we will represent a sprint as a simple string.
    #     """
    #     sprint_number = len(self._sprints) + 1
    #     new_sprint = f"Sprint {sprint_number}"
    #     self._sprints.append(new_sprint)


    # + getID(): int
    def getID(self) -> int:
        """
        Returns the project ID.
        """
        return self.id
