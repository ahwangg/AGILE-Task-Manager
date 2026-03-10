#task.py
from datetime import datetime

class Task:
    def __init__(self, ID: int, name: str, description: str, status: TaskStatus, dueDate: datetime, priority: PriorityLevel):
        #Attributes from UML
        self.taskID = ID
        self.taskName = name
        self.taskDes = description
        self.status = status
        self.dueDate = dueDate
        self.priorityLevel = priority

# + setTaskName(name: String): void
    def setTaskName(self, name: str):
        self.taskName = name

# + setTaskDes(description: String): void
    def setTaskDes(self, description: str):
        self.taskDes = description


# helper class for the Status dropdown attribute
class TaskStatus():
    def __init__(self):
        self.status = "Not Started"
    
    # def updateStatus(self, dropdownVal: int):
        # return

# helper class for the Priority dropdown attribute
class PriorityLevel():
    def __init__(self):
        self.priority = "Low"
    
    # def updatePriority(dropdownVal: int):
        # return