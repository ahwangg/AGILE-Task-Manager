# 🌱 SprintBloom: Agile Plant Task Manager

🌼 **A gamified Agile task management app that helps users organize projects, manage sprints, complete tasks, and grow a virtual plant as progress is made.**

---

## 🚀 Features

- 🌱 **Plant Growth Progression** — Complete sprint tasks to grow a plant from seed to full bloom.
- 📋 **Sprint Board** — Organize tasks using To Do, In Progress, and Done columns.
- ✅ **Task Management** — Create, update, move, archive, restore, and delete tasks.
- 🏃 **Sprint Management** — Create, start, end, select, and remove sprints.
- 📦 **Product Backlog** — View task details such as priority, due date, status, and sprint assignment.
- ⭐ **Priority Points** — High, Medium, and Low priority tasks contribute different growth points.
- 🔄 **Archive Restore System** — Restore archived tasks back into the sprint board when needed.

---

## 🛠️ Tech Stack

- **React** — Frontend user interface and sprint board.
- **JavaScript / JSX** — Component logic and user interactions.
- **React Router** — Page navigation and routing.
- **FastAPI** — Backend API and server logic.
- **Python** — Backend programming language.
- **SQLAlchemy** — Database ORM for models and queries.

---

## ⚡ Quick Start

### Clone the repo

```bash
git clone https://github.com/your-username/SprintBloom.git
cd SprintBloom
```

---

## 🖥️ Run the Frontend

```bash
# Move into the frontend folder
cd frontend

# Install frontend dependencies
npm install

# Start the React development server
npm start
```

Frontend runs at:

```bash
http://localhost:3000
```

---

## 🧠 Run the Backend

```bash
# Move into the backend folder
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
venv\Scripts\activate

# Activate the virtual environment (macOS/Linux)
source venv/bin/activate

# Install backend dependencies
pip install fastapi uvicorn sqlalchemy pydantic

# Start the FastAPI backend server
uvicorn main:app --reload
```

Backend runs at:

```bash
http://localhost:8000
```

---

---

## 🌸 Plant Growth System

SprintBloom uses task priority points to calculate plant growth progress.

| Priority | Points |
|----------|--------|
| High     | 3 |
| Medium   | 2 |
| Low      | 1 |

Growth stages:

```bash
Seed → Sprout → Leafy Plant → Bloom → Full Flower
```

---


---

## 🌟 Future Improvements

- 🔐 User authentication system
- 🌿 Plant inventory and collectible plants
- 🔔 Notifications and reminders
- ♿ Accessibility improvements
- 📱 Better mobile responsiveness

---

## 👥 Contributors

- Lexi
- Alex
- Mariel
- Ethan

---

## 💡 About SprintBloom

SprintBloom was created as a software engineering project focused on combining Agile sprint management with motivational gamification. Instead of simply checking tasks off a list, users can visually watch their productivity grow through an evolving plant system.
