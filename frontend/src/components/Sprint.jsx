import { useState } from "react";
import { useLocation } from "react-router-dom";
import FrontPlant from "./FrontPlant";

function Sprint() {
  const location = useLocation();
  const { projectId: initialProjectId, sprintName } = location.state || {};

  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId || "");

  // 🌱 TASK STATE
  const [tasks, setTasks] = useState([]);

  // CREATE SPRINT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !projectId) {
      alert("Please fill in all fields");
      return;
    }

    alert(`Sprint "${name}" created for ${projectId}`);
    setName("");
    setProjectId("");
  };

  // ➕ ADD TASK
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: `Task ${tasks.length + 1}`,
      status: "todo"
    };
    setTasks([...tasks, newTask]);
  };

  // ▶️ START TASK
  const startTask = () => {
    const updated = tasks.map(task =>
      task.status === "todo"
        ? { ...task, status: "inprogress" }
        : task
    );
    setTasks(updated);
  };

  // ✅ COMPLETE TASK
  const completeTask = () => {
    const updated = tasks.map(task =>
      task.status === "inprogress"
        ? { ...task, status: "done" }
        : task
    );
    setTasks(updated);
  };

  // ❌ DELETE TASK (decrements automatically)
  const deleteTask = () => {
    if (tasks.length === 0) return;
    const updated = tasks.slice(0, -1); // removes last task
    setTasks(updated);
  };

  // 📊 COUNTS
  const todoTasks = tasks.filter(t => t.status === "todo");
  const inProgressTasks = tasks.filter(t => t.status === "inprogress");
  const doneTasks = tasks.filter(t => t.status === "done");

  const completedTasks = doneTasks.length;

  return (
    <div style={{ padding: "20px" }}>

      <h1>{sprintName || "Sprint Board"}</h1>
      <p>Project: {projectId || "No project selected"}</p>

      {/* CREATE SPRINT */}
      <section>
        <h2>Create New Sprint</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sprint name"
          />

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select>

          <button type="submit">Create Sprint</button>
        </form>
      </section>

      {/* ACTIONS */}
      <section>
        <h2>Actions</h2>
        <button onClick={addTask}>Add Task</button>
        <button onClick={startTask}>Start Task</button>
        <button onClick={completeTask}>Complete Task</button>
        <button onClick={deleteTask}>Delete Task</button>
      </section>

      {/* COUNTS */}
      <section>
        <h3>Task Counts</h3>
        <p>To Do: {todoTasks.length}</p>
        <p>In Progress: {inProgressTasks.length}</p>
        <p>Done: {doneTasks.length}</p>
      </section>

      {/* BOARD */}
      <section>
        <h2>Current Sprint Board</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

          {/* TO DO */}
          <div style={columnStyle}>
            <h3>To Do</h3>
            {todoTasks.map(task => (
              <p key={task.id}>{task.name}</p>
            ))}
          </div>

          {/* IN PROGRESS */}
          <div style={columnStyle}>
            <h3>In Progress</h3>
            {inProgressTasks.map(task => (
              <p key={task.id}>{task.name}</p>
            ))}
          </div>

          {/* DONE */}
          <div style={columnStyle}>
            <h3>Done</h3>
            {doneTasks.map(task => (
              <p key={task.id}>{task.name}</p>
            ))}
          </div>

        </div>
      </section>

      {/* 🌱 PLANT INTEGRATION */}
      <section>
        <FrontPlant completedTasks={completedTasks} />
      </section>

    </div>
  );
}

const columnStyle = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#f4f4f4",
  borderRadius: "8px",
  minHeight: "200px",
};

export default Sprint;