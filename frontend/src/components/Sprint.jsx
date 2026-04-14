import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Sprint() {
  const location = useLocation();
  const projectId = location.state?.projectId || "";

  const [name, setName] = useState("");
  const [projectIdState] = useState(projectId);
  const [sprintId, setSprintId] = useState(null);
  const [active, setActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [visible] = useState(true);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedSprintForTask, setSelectedSprintForTask] = useState("");
  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  // -----------------------------
  // CREATE SPRINT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !projectIdState) {
      alert("Please fill in all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/sprint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        projectId: projectIdState,
      }),
    });

    const data = await res.json();

    setSprintId(data.id);
    setActive(data.active || false);
    setName("");

    fetchTasks(data.id);
  };

  // -----------------------------
  // LOAD TASKS
  // -----------------------------
  const fetchTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    if (sprintId) fetchTasks(sprintId);
  }, [sprintId]);

  // -----------------------------
  // ADD TASK (USER NAMED)
  // -----------------------------
  const addTask = async () => {
    if (!sprintId) return alert("Create sprint first");
    if (!taskName.trim()) return alert("Enter a task name");

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sprintId,
        name: taskName,
      }),
    });

    const newTask = await res.json();

    setTasks((prev) => [...prev, newTask]);
    setTaskName("");
  };

  // -----------------------------
  // MOVE SINGLE TASK
  // -----------------------------
  const moveTask = (taskId, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    );
  };

  // -----------------------------
  // ARCHIVE TASK
  // -----------------------------
  const archiveTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // -----------------------------
  // DELETE LAST TASK
  // -----------------------------
  const deleteTask = () => {
    if (!window.confirm("Delete last task?")) return;
    setTasks((prev) => prev.slice(0, -1));
  };

  // -----------------------------
  // SPRINT ACTIONS
  // -----------------------------
  const startSprint = async () => {
    if (!sprintId) return alert("Create sprint first");

    await fetch(`http://localhost:5000/api/sprint/${sprintId}/start`, {
      method: "POST",
    });

    setActive(true);
  };

  const endSprint = async () => {
    if (!sprintId) return;

    await fetch(`http://localhost:5000/api/sprint/${sprintId}/end`, {
      method: "POST",
    });

    setActive(false);
  };

  const deleteSprint = async () => {
    if (!sprintId) return;

    await fetch(`http://localhost:5000/api/sprint/${sprintId}`, {
      method: "DELETE",
    });

    setSprintId(null);
    setTasks([]);
    setActive(false);
  };

  // -----------------------------
  // COLUMN FILTERS
  // -----------------------------
  const todo = tasks.filter((t) => t.status === "todo");
  const inprogress = tasks.filter((t) => t.status === "inprogress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div style={styles.page}>
      {/* BACKGROUND */}
      <div style={styles.sky} />
      <div style={styles.ground} />
      <div style={styles.soilLayer1} />
      <div style={styles.soilLayer2} />

      {/* ROOTS */}
      <svg style={styles.rootsSvg} viewBox="0 0 400 300">
        <path
          d="M200 0 Q180 60 150 100 Q120 140 80 180 Q50 210 20 280"
          stroke="#5c3a1e"
          strokeWidth="3"
          fill="none"
          opacity="0.3"
        />
      </svg>

      <div style={{ ...styles.content, opacity: visible ? 1 : 0 }}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.seedIcon}>🌱</div>

          <div>
            <h1 style={styles.title}>Sprint Board</h1>

            <p style={styles.subtitle}>
              Project: {projectIdState || "None"}
            </p>

            <p
              style={{
                color: active ? "#4caf50" : "#c9a87a",
                fontWeight: "bold",
                marginTop: 4,
              }}
            >
              Sprint Status: {active ? "ACTIVE 🟢" : "INACTIVE ⚪"}
            </p>

            {sprintId && (
              <p style={{ fontSize: 12, opacity: 0.7 }}>
                Sprint ID: #{sprintId}
              </p>
            )}
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div style={styles.mainLayout}>
          {/* SIDEBAR */}
          <div style={styles.sidebar}>
            {/* CREATE SPRINT */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Create Sprint</h2>

              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sprint name"
                />
                <button style={styles.button}>Create</button>
              </form>
            </div>

            {/* ACTIONS */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Actions</h2>

              {/* TASK INPUT */}
              <input
                style={styles.input}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
              />

              <div style={styles.row}>
                <button style={styles.btn} onClick={addTask}>
                  Add Task
                </button>
              </div>

              <div style={styles.row}>
                <button style={styles.btn} onClick={deleteTask}>
                  Delete Last
                </button>
              </div>

              <div style={styles.row}>
                <button style={styles.btn} onClick={startSprint}>
                  Start Sprint
                </button>
                <button style={styles.btn} onClick={endSprint}>
                  End Sprint
                </button>
                <button style={styles.btnDanger} onClick={deleteSprint}>
                  Remove Sprint
                </button>
              </div>
            </div>
          </div>

          {/* BOARD */}
          <div style={styles.board}>
            <Column title="To Do" tasks={todo} moveTask={moveTask} archiveTask={archiveTask} />
            <Column title="In Progress" tasks={inprogress} moveTask={moveTask} archiveTask={archiveTask} />
            <Column title="Done" tasks={done} moveTask={moveTask} archiveTask={archiveTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// COLUMN COMPONENT
// -----------------------------
function Column({ title, tasks = [], moveTask, archiveTask }) {
  const nextStatus =
    title === "To Do"
      ? "inprogress"
      : title === "In Progress"
      ? "done"
      : null;

  return (
    <div style={styles.column}>
      <h3 style={styles.colTitle}>{title}</h3>

      <div style={styles.taskContainer}>
        {tasks.length === 0 ? (
          <p style={{ opacity: 0.5 }}>Empty</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} style={styles.taskCard}>
              <p style={styles.taskTitle}>{t.name}</p>
              <p style={styles.taskMeta}>#{t.id}</p>

              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {nextStatus && (
                  <button
                    style={styles.smallBtn}
                    onClick={() => moveTask(t.id, nextStatus)}
                  >
                    Move →
                  </button>
                )}

                <button
                  style={styles.smallBtnDanger}
                  onClick={() => archiveTask(t.id)}
                >
                  Archive
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* 🌿 STYLES (UNCHANGED + SCROLL SUPPORT + CARDS) */
const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    fontFamily: "Georgia",
    backgroundColor: "#1a0e07",
    overflow: "hidden",
  },
  sky: {
    position: "absolute",
    top: 0,
    height: "35%",
    width: "100%",
    background: "linear-gradient(180deg, #b8d4e8, #d4e8c2)",
  },
  ground: {
    position: "absolute",
    top: "35%",
    width: "100%",
    bottom: 0,
    background: "linear-gradient(180deg, #5c3a1e, #2a1508)",
  },
  soilLayer1: {
    position: "absolute",
    top: "33%",
    width: "100%",
    height: 6,
    background: "#7a4f2a",
  },
  soilLayer2: {
    position: "absolute",
    top: "36%",
    width: "100%",
    height: 3,
    background: "#4a2c12",
  },
  rootsSvg: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "400px",
    height: "300px",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 10,
    maxWidth: 1200,
    margin: "0 auto",
    padding: 40,
  },
  header: {
    display: "flex",
    gap: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  seedIcon: { fontSize: 40 },
  title: { color: "#f5e6c8", margin: 0 },
  subtitle: { color: "#c9a87a", fontStyle: "italic" },

  mainLayout: {
    display: "flex",
    gap: 20,
    alignItems: "stretch",
    minHeight: "70vh",
  },

  sidebar: {
    width: 260,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  card: {
    background: "rgba(245,230,200,0.92)",
    padding: 20,
    borderRadius: 12,
  },

  cardTitle: { marginBottom: 10 },

  form: { display: "flex", gap: 10 },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 10,
  },

  button: {
    background: "#8b5e3c",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: 6,
  },

  row: { display: "flex", gap: 10, marginTop: 10 },

  btn: {
    background: "#8b5e3c",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 6,
  },

  btnDanger: {
    background: "#7a2e2e",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 6,
  },

  board: {
    flex: 1,
    display: "flex",
    gap: 15,
    height: "100%",
  },

  column: {
    flex: 1,
    background: "rgba(245,230,200,0.85)",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    minHeight: "300px",
    maxHeight: "70vh",
  },

  taskContainer: {
    flex: 1,
    overflowY: "auto",
    paddingRight: 5,
  },

  taskCard: {
    background: "rgba(255,255,255,0.6)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  taskTitle: {
    margin: 0,
    fontWeight: "bold",
    color: "#3a2a1a",
  },

  taskMeta: {
    margin: 0,
    fontSize: 12,
    opacity: 0.6,
  },

  smallBtn: {
    background: "#8b5e3c",
    color: "white",
    border: "none",
    padding: "4px 8px",
    borderRadius: 5,
    fontSize: 12,
  },

  smallBtnDanger: {
    background: "#7a2e2e",
    color: "white",
    border: "none",
    padding: "4px 8px",
    borderRadius: 5,
    fontSize: 12,
  },
};

export default Sprint;