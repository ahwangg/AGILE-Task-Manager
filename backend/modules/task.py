# task.py
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
        """
        Updates the Task's Name
        """
        self.taskName = name

    # + setTaskDes(description: String): void
    def setTaskDes(self, description: str):
        """
        Updates the Task's Description
        """
        self.taskDes = description

    # + setDueDate(dueDate: datetime): void
    def setDueDate(self, dueDate: datetime):
        """
        Updates the Task's Due Date
        """
        if not isinstance(dueDate, datetime):
            raise ValueError("Due date must be a datetime object")
        
        self.dueDate = dueDate

    # + getTaskName(): string
    def getTaskName(self) -> str:
        """
        Retrieves the Task's Name
        """
        return self.taskName

    # + getTaskDes(): string
    def getTaskDes(self) -> str:
        """
        Retrieves the Task's Description
        """
        return self.taskDes
    
    # + autoAssignPriority(): void
    def autoAssignPriority(self):
        """
        Automatically assigns the Task's Priority based on its Due Date
        """
        now = datetime.now()
        days_remaining = (self.dueDate - now).days

        if days_remaining <= 1:
            self.priorityLevel.priority = "High"
        elif days_remaining <=3:
            self.priorityLevel.priority = "Medium"
        else:
            self.priorityLevel.priority = "Low"

    # + archive(): void
    def archive(self):
        """
        Archives the task so it no longer appears in active task lists.
        """
        self.isArchived = True


# helper class for the Status dropdown attribute
class TaskStatus():
    def __init__(self):
        self.status = "todo"
    
    # def updateStatus(self, dropdownVal: int):
        # return
    
        # + markComplete(): void
    def markComplete(self):
        """
        Marks the task as completed.
        """
        self.status.status = "done"

# helper class for the Priority dropdown attribute
class PriorityLevel():
    def __init__(self):
        self.priority = "Low"
    
    # def updatePriority(dropdownVal: int):
        # return