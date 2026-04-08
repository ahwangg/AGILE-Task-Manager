# sprint.py
from datetime import datetime

class Sprint:
    def __init__(self, number: int, startDate: datetime, endDate: datetime):
        # Attributes from UML
        self.number = number
        self.startDate = startDate
        self.endDate = endDate

        # Track sprint status
        self.active = False

        # default point value
        self.totalPoints = 0

    # + startSprint(): bool
    def startSprint(self) -> bool:
        """
        Starts the sprint if it is not already active.
        """
        if not self.active:
            self.active = True
            return True
        return False

    # + endSprint(): bool
    def endSprint(self) -> bool:
        """
        Ends the sprint if it is currently active.
        """
        if self.active:
            self.active = False
            return True
        return False
    
    # +getPoints():int
    def getPoints(self) -> int:
        return self.totalPoints
    
    # +updatePoints():void
    def updatePoints(self, points: int):
        self.totalPoints = points