import { useState } from "react";

function Sprint() {
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !projectId) {
      alert("Please fill in all fields");
      return;
    }

    alert(`Sprint "${name}" created for ${projectId}`);

    // Reset form (important for UI)
    setName("");
    setProjectId("");
  };

  return (
    <div>

      <h1>Sprint Board</h1>

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

      <h2>Actions</h2>

      <div>
        <button onClick={() => alert("Start Sprint")}>Start Sprint</button>
        <button onClick={() => alert("End Sprint")}>End Sprint</button>
        <button onClick={() => alert("Add Task")}>Add Task</button>
        <button onClick={() => alert("Mark Complete")}>Mark Complete</button>
        <button onClick={() => alert("Archive Sprint")}>Archive Sprint</button>
      </div>

    </div>
  );
}

export default Sprint;