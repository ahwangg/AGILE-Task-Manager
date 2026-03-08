# project.py
from sprint import Sprint
from datetime import datetime
class Project:
    def __init__(self, name: str, projID: int):
        # Attributes from UML
        self.name = name
        self.projID = projID

        # Internal storage for sprints
        self._sprints = []


    # + createSprint(): void
    def createSprint(self) -> None:
        """
        Creates a new sprint and adds it to the project.
        For now, we will represent a sprint as a simple string.
        """
        sprint_number = len(self._sprints) + 1
        new_sprint = f"Sprint {sprint_number}"
        self._sprints.append(new_sprint)


    # + getID(): int
    def getID(self) -> int:
        """
        Returns the project ID.
        """
        return self.projID
