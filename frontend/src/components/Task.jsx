import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskPage() {
  const location = useLocation();
  const { sprintId, tasks: initialTasks } = location.state || {};

  const [tasks, setTasks] = useState(initialTasks || []);
  const [plantImage, setPlantImage] = useState("");

  // 🌱 calculate progress
  const completed = tasks.filter(t => t.status === "done").length;
  const total = tasks.length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  // 🌿 plant stage logic (frontend version)
  const getPlantStage = (p) => {
    if (p < 25) return "/images/seed_plant.webp";
    if (p < 50) return "/images/sprout_plant.webp";
    if (p < 75) return "/images/leafy_plant.webp";
    if (p < 100) return "/images/bloom_plant.webp";
    return "/images/flower_plant.webp";
  };

  useEffect(() => {
    setPlantImage(getPlantStage(progress));
  }, [progress]);

  return (
    <div style={styles.page}>

      {/* LEFT: TASK LIST */}
      <div style={styles.taskPanel}>
        {tasks.map(task => (
          <div key={task.id} style={styles.taskItem}>
            <div>
              <strong>{task.name}</strong>
              <div>{task.description}</div>
            </div>

            <div
              style={{
                ...styles.statusBox,
                background:
                  task.status === "done" ? "green" : "gray"
              }}
            />
          </div>
        ))}

        {/* Add task button */}
        <div style={styles.addTask}></div>
      </div>

      {/* RIGHT: PLANT */}
      <div style={styles.plantBox}>
        <img src={plantImage} style={styles.plantImage} />
      </div>

    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "space-between",
    padding: 50,
    backgroundColor: "#7a3f00",
    height: "100vh"
  },

  taskPanel: {
    background: "#c8b39a",
    padding: 20,
    width: 300
  },

  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#eee",
    padding: 10,
    marginBottom: 10
  },

  statusBox: {
    width: 20,
    height: 20
  },

  addTask: {
    width: 40,
    height: 40,
    background: "lightgreen",
    margin: "20px auto"
  },

  plantBox: {
    width: 200,
    height: 300,
    background: "#cfe2f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  plantImage: {
    width: 120
  }
};

export default TaskPage;