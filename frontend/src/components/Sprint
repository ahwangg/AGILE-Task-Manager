import { useState } from "react";
import { useLocation } from "react-router-dom";

function Sprint() {
  // Get project & sprint info from dashboard
  const location = useLocation();
  const { projectId: initialProjectId, sprintName } = location.state || {};

  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId || "");

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

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Dynamic sprint heading */}
      <h1>{sprintName || "Sprint Board"}</h1>
      <p>Project: {projectId || "No project selected"}</p>

      {/* CREATE SPRINT */}
      <section>
        <h2>Create New Sprint</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Sprint Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter sprint name"
            />
          </div>

          <div>
            <label>Project:</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">Select Project</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
            </select>
          </div>

          <button type="submit">Create Sprint</button>
        </form>
      </section>

      {/* ACTIONS */}
      <section>
        <h2>Actions</h2>
        <div>
          <button>Start Sprint</button>
          <button>End Sprint</button>
          <button>Add Task</button>
          <button>Mark Complete</button>
          <button>Archive Sprint</button>
        </div>
      </section>

      {/* SPRINT BOARD */}
      <section>
        <h2>Current Sprint Board</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          
          {/* TO DO */}
          <div style={columnStyle}>
            <h3>To Do</h3>
            <p>No tasks yet</p>
          </div>

          {/* IN PROGRESS */}
          <div style={columnStyle}>
            <h3>In Progress</h3>
            <p>No tasks yet</p>
          </div>

          {/* DONE */}
          <div style={columnStyle}>
            <h3>Done</h3>
            <p>No tasks yet</p>
          </div>

        </div>
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