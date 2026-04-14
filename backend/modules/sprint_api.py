from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# -----------------------------
# IN-MEMORY STORAGE
# -----------------------------
sprints = {}
tasks = {}

# -----------------------------
# CREATE SPRINT
# -----------------------------
@app.route("/api/sprint", methods=["POST"])
def create_sprint():
    data = request.json

    project_id = data.get("projectId")
    name = data.get("name")

    if not project_id or not name:
        return jsonify({"error": "Missing data"}), 400

    sprint_id = len(sprints) + 1

    sprints[sprint_id] = {
        "id": sprint_id,
        "projectId": project_id,
        "name": name,
        "active": False,
        "createdAt": datetime.now().isoformat()
    }

    return jsonify(sprints[sprint_id])


# -----------------------------
# GET SPRINT
# -----------------------------
@app.route("/api/sprint/<int:sprint_id>", methods=["GET"])
def get_sprint(sprint_id):
    sprint = sprints.get(sprint_id)

    if not sprint:
        return jsonify({"error": "Sprint not found"}), 404

    return jsonify(sprint)


# -----------------------------
# START SPRINT
# -----------------------------
@app.route("/api/sprint/<int:sprint_id>/start", methods=["POST"])
def start_sprint(sprint_id):
    sprint = sprints.get(sprint_id)

    if not sprint:
        return jsonify({"error": "Sprint not found"}), 404

    sprint["active"] = True
    return jsonify(sprint)


# -----------------------------
# END SPRINT
# -----------------------------
@app.route("/api/sprint/<int:sprint_id>/end", methods=["POST"])
def end_sprint(sprint_id):
    sprint = sprints.get(sprint_id)

    if not sprint:
        return jsonify({"error": "Sprint not found"}), 404

    sprint["active"] = False
    return jsonify(sprint)


# -----------------------------
# DELETE SPRINT
# -----------------------------
@app.route("/api/sprint/<int:sprint_id>", methods=["DELETE"])
def delete_sprint(sprint_id):
    if sprint_id in sprints:
        del sprints[sprint_id]

        # also delete related tasks
        global tasks
        tasks = {
            k: v for k, v in tasks.items()
            if v["sprintId"] != sprint_id
        }

        return jsonify({"message": "Sprint deleted"})

    return jsonify({"error": "Sprint not found"}), 404


# =========================================================
# TASK SYSTEM (THIS FIXES YOUR BOARD)
# =========================================================

# -----------------------------
# CREATE TASK
# -----------------------------
@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.json

    sprint_id = data.get("sprintId")
    name = data.get("name")
    description = data.get("description", "")
    priority = data.get("priority", "Low")
    due_date = data.get("dueDate", "")

    if not sprint_id or not name:
        return jsonify({"error": "Missing data"}), 400

    task_id = len(tasks) + 1

    tasks[task_id] = {
        "id": task_id,
        "sprintId": sprint_id,
        "name": name,
        "description": description,
        "priority": priority,
        "dueDate": due_date,
        "status": "todo",
        "createdAt": datetime.now().isoformat()
    }

    return jsonify(tasks[task_id]), 201


# -----------------------------
# GET TASKS BY SPRINT
# -----------------------------
@app.route("/api/tasks/<int:sprint_id>", methods=["GET"])
def get_tasks(sprint_id):
    sprint_tasks = [
        t for t in tasks.values()
        if t["sprintId"] == sprint_id
    ]
    return jsonify(sprint_tasks)


# -----------------------------
# UPDATE TASK STATUS
# -----------------------------
@app.route("/api/tasks/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    data = request.json
    task = tasks.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    task["status"] = data.get("status", task["status"])
    return jsonify(task)


# -----------------------------
# DELETE TASK
# -----------------------------
@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    if task_id in tasks:
        del tasks[task_id]
        return jsonify({"message": "Task deleted"})

    return jsonify({"error": "Task not found"}), 404


# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)