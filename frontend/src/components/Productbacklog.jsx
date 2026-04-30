import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

export default function ProductBacklog() {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // task being edited
    const [taskForm, setTaskForm] = useState({
        name: "",
        description: "",
        priority: "Low",
        dueDate: "",
        sprintId: "",
    });

    // -------------------------
    // FETCH ALL TASKS FOR PROJECT
    // -------------------------
    const fetchData = async () => {
        setLoading(true);
        try {
            // Get all sprints for this project
            const [sprintRes, taskRes] = await Promise.all([
                fetch(`${API}/sprints/project/${projectId}`),
                fetch(`${API}/api/tasks/project/${projectId}`)
            ]);
            const sprintList = await sprintRes.json();
            const taskData = await taskRes.json();

            setSprints(Array.isArray(sprintList) ? sprintList : []);

            const sprintMap = {};
            sprintList.forEach(s => sprintMap[s.id] = s.name);
            const tasksWithNames = taskData.map(t => ({ ...t, sprintName: sprintMap[t.sprint_id] || "—" }));

            setTasks(tasksWithNames);
        } catch (err) {
            setError("Could not load backlog.");
        } finally {
            setLoading(false);
        }
        };

        useEffect(() => {
            fetchData();
        }, [projectId]);
        

    // -------------------------
    // CREATE TASK
    // -------------------------
    // e - form event. e.preventDefault() stops page from refreshing when form is submitted
    // which is default browser behavior
    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!taskForm.name.trim()) return alert("Task name is required");
        if (!taskForm.sprintId) return alert("Please select a sprint");

        try {
            const res = await fetch(`${API}/api/tasks/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sprintId: parseInt(taskForm.sprintId),
                    name: taskForm.name,
                    description: taskForm.description,
                    priority: taskForm.priority,
                    dueDate: taskForm.dueDate,
                }),
            });
            if (!res.ok) throw new Error("Failed to create task");
            resetForm();
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert("Error: " + err.mesage);
        }
    };

    // -------------------------
    // UPDATE TASK STATUS
    // -------------------------
    // taskId and newStatus are passed in once status value is selected from dropdown
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const res = await fetch(`${API}/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Failed to update task");
            setTasks(prev =>
                prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
            );
        } catch (err) {
            alert("Error updating task: " + err.message);
        }
    };

    // -------------------------
    // DELETE TASK
    // -------------------------
    const handleDelete = async (taskId) => {
        if (!window.confirm("Delete this task?")) return;
        try {
            const res = await fetch(`${API}/api/tasks/${taskId}`, {method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete task");
            setTasks(prev => prev.filter(t => t.id !== taskId));
        } catch (err) {
            alert("Error deleting task: " + err.message);
        }
    };

    const resetForm = () => {
        setTaskForm({ name: "", description: "", priority: "Low", dueDate: "", sprintId: "" });
        setEditingTask(null);
    };

    const priorityColor = (p) => {
        if (p === "High") return "#c0392b";
        if (p === "Medium") return "#e67e22";
        return "#27ae60";
    };

    const statusLabel = (s) => {
        if (s === "inprogress") return "In Progress";
        if (s === "done") return "Done";
        return "To Do";

    }

    return (
    <div style={styles.page}>
      <div style={styles.sky} />
      <div style={styles.ground} />
      <div style={styles.soilLayer1} />
      <div style={styles.soilLayer2} />
 
      <svg style={styles.rootsSvg} viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M200 0 Q180 60 150 100 Q120 140 80 180 Q50 210 20 280"
          stroke="#5c3a1e" strokeWidth="3" fill="none" opacity="0.3" />
        <path d="M200 0 Q220 80 260 120 Q300 160 340 200 Q370 230 390 280"
          stroke="#5c3a1e" strokeWidth="2.5" fill="none" opacity="0.25" />
      </svg>
 
      <div style={styles.content}>
        {/* HEADER */}
        <div style={styles.header}>
          <button onClick={() => navigate(`/projects/${projectId}`)} style={styles.backBtn}>
            ← Sprint Board
          </button>
          <div style={styles.seedIcon}>🌿</div>
          <div>
            <h1 style={styles.title}>Product Backlog</h1>
            <p style={styles.subtitle}>Project #{projectId} — all tasks across sprints</p>
          </div>
          <button style={styles.addBtn} onClick={() => setShowModal(true)}>
            + Add Task
          </button>
        </div>
 
        {error && <p style={styles.error}>{error}</p>}
 
        {loading ? (
          <p style={{ color: "#c9a87a", fontStyle: "italic" }}>Loading backlog...</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["ID", "Name", "Description", "Sprint", "Priority", "Due Date", "Status", "Actions"].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ ...styles.td, textAlign: "center", opacity: 0.6 }}>
                      No tasks yet. Add one above.
                    </td>
                  </tr>
                ) : (
                  tasks.map(task => (
                    <tr key={task.id} style={styles.tr}>
                      <td style={styles.td}>#{task.id}</td>
                      <td style={{ ...styles.td, fontWeight: "bold" }}>{task.name}</td>
                      <td style={{ ...styles.td, opacity: 0.8 }}>{task.description || "—"}</td>
                      <td style={styles.td}>{task.sprintName || "—"}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, background: priorityColor(task.priority) }}>
                          {task.priority}
                        </span>
                      </td>
                      <td style={styles.td}>{task.due_date || "—"}</td>
                      <td style={styles.td}>
                        <select
                          value={task.status}
                          onChange={e => handleStatusChange(task.id, e.target.value)}
                          style={styles.statusSelect}
                        >
                          <option value="todo">To Do</option>
                          <option value="inprogress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(task.id)}
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
 
      {/* ADD TASK MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>🌱 New Backlog Task</h2>
 
            <label style={styles.label}>Task Name *</label>
            <input
              style={styles.input}
              placeholder="Task name"
              value={taskForm.name}
              onChange={e => setTaskForm(p => ({ ...p, name: e.target.value }))}
              autoFocus
            />
 
            <label style={styles.label}>Description</label>
            <input
              style={styles.input}
              placeholder="Optional description"
              value={taskForm.description}
              onChange={e => setTaskForm(p => ({ ...p, description: e.target.value }))}
            />
 
            <label style={styles.label}>Sprint *</label>
            <select
              style={styles.input}
              value={taskForm.sprintId}
              onChange={e => setTaskForm(p => ({ ...p, sprintId: e.target.value }))}
            >
              <option value="">-- Select a sprint --</option>
              {sprints.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
 
            <label style={styles.label}>Priority</label>
            <select
              style={styles.input}
              value={taskForm.priority}
              onChange={e => setTaskForm(p => ({ ...p, priority: e.target.value }))}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
 
            <label style={styles.label}>Due Date</label>
            <input
              type="date"
              style={styles.input}
              value={taskForm.dueDate}
              onChange={e => setTaskForm(p => ({ ...p, dueDate: e.target.value }))}
            />
 
            <div style={styles.modalBtns}>
              <button style={styles.cancelBtn} onClick={() => { resetForm(); setShowModal(false); }}>
                Cancel
              </button>
              <button style={styles.saveBtn} onClick={handleCreateTask}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
    const styles = {
    page: {
        minHeight: "100vh", position: "relative", overflow: "hidden",
        fontFamily: "'Georgia', serif", backgroundColor: "#1a0e07",
    },
    sky: {
        position: "absolute", top: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(180deg, #b8d4e8 0%, #d4e8c2 100%)",
    },
    ground: {
        position: "absolute", top: "35%", left: 0, right: 0, bottom: 0,
        background: "linear-gradient(180deg, #5c3a1e 0%, #2a1508 100%)",
    },
    soilLayer1: { position: "absolute", top: "33%", left: 0, right: 0, height: 6, background: "#7a4f2a" },
    soilLayer2: { position: "absolute", top: "36%", left: 0, right: 0, height: 3, background: "#4a2c12" },
    rootsSvg: {
        position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 400, height: 300, pointerEvents: "none",
    },
    content: { position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" },
    header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" },
    backBtn: {
        background: "rgba(245,230,200,0.15)", border: "1px solid rgba(245,230,200,0.3)",
        color: "#f5e6c8", borderRadius: 20, padding: "8px 16px", cursor: "pointer",
        fontSize: 14, fontFamily: "Georgia",
    },
    seedIcon: { fontSize: 40 },
    title: { margin: 0, fontSize: 32, fontWeight: 700, color: "#f5e6c8", textShadow: "0 2px 8px rgba(0,0,0,0.4)" },
    subtitle: { margin: "4px 0 0", fontSize: 14, color: "#c9a87a", fontStyle: "italic" },
    addBtn: {
        marginLeft: "auto", background: "#8b5e3c", color: "#f5e6c8",
        border: "none", padding: "10px 20px", borderRadius: 8,
        cursor: "pointer", fontSize: 14, fontFamily: "Georgia", fontWeight: 700,
    },
    error: { color: "#e85d3a", marginBottom: 16 },
    tableWrapper: { overflowX: "auto", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" },
    table: { width: "100%", borderCollapse: "collapse", background: "rgba(245,230,200,0.92)", borderRadius: 12 },
    th: {
        padding: "12px 16px", textAlign: "left", fontSize: 13,
        fontWeight: 700, color: "#5c3a1e", borderBottom: "2px solid rgba(92,58,30,0.2)",
        background: "rgba(200,170,120,0.4)",
    },
    tr: { borderBottom: "1px solid rgba(92,58,30,0.1)", transition: "background 0.15s" },
    td: { padding: "10px 16px", fontSize: 14, color: "#3a2a1a", verticalAlign: "middle" },
    badge: {
        display: "inline-block", padding: "2px 10px", borderRadius: 20,
        color: "white", fontSize: 12, fontWeight: 700,
    },
    statusSelect: {
        padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(92,58,30,0.3)",
        background: "rgba(255,255,255,0.6)", fontFamily: "Georgia", fontSize: 13, cursor: "pointer",
    },
    deleteBtn: {
        background: "none", border: "none", cursor: "pointer", fontSize: 16,
    },
    modalOverlay: {
        position: "fixed", inset: 0, background: "rgba(20,10,4,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    },
    modal: {
        background: "#f5e6c8", borderRadius: 16, padding: 32,
        width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 8,
    },
    modalTitle: { margin: "0 0 8px", fontSize: 22, color: "#3d2010" },
    label: { fontSize: 13, fontWeight: 700, color: "#5c3a1e", marginTop: 4 },
    input: {
        padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(92,58,30,0.3)",
        background: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "Georgia",
        color: "#3d2010", outline: "none", width: "100%", boxSizing: "border-box",
    },
    modalBtns: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 },
    cancelBtn: {
        padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(92,58,30,0.3)",
        background: "transparent", cursor: "pointer", fontSize: 14, fontFamily: "Georgia", color: "#5c3a1e",
    },
    saveBtn: {
        padding: "8px 20px", borderRadius: 8, border: "none",
        background: "#8b5e3c", cursor: "pointer", fontSize: 14,
        fontFamily: "Georgia", color: "#f5e6c8", fontWeight: 700,
    },

 

};  // EO ProductBacklog