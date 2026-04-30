import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  // Fetch projects from backend
  useEffect(() => {
    fetch(`${API}/projects/`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
        setTimeout(() => setVisible(true), 50);
      })
      .catch(() => {
        setError("Could not connect to server.");
        setLoading(false);
      });
  }, []);

  const handleCreate = async () => {
  if (!newName.trim()) return;

  try {
    const res = await fetch(`${API}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName.trim() }),
    });

    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RAW RESPONSE:", text);

    if (!res.ok) {
      throw new Error(text);
    }

    const created = JSON.parse(text);

    setProjects((prev) => [...prev, created]);
    setNewName("");
    setShowModal(false);
  } catch (err) {
    console.error("Create project error:", err);
    setError(err.message);
  }
};

  const handleDelete = async (e, projectId) => {
    e.stopPropagation(); // don't navigate when deleting
    try {
      await fetch(`${API}/projects/${projectId}`, { method: "DELETE" });
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch {
      setError("Failed to delete project.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.sky} />
      <div style={styles.ground} />
      <div style={styles.soilLayer1} />
      <div style={styles.soilLayer2} />

      <svg style={styles.rootsSvg} viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M200 0 Q180 60 150 100 Q120 140 80 180 Q50 210 20 280" stroke="#5c3a1e" strokeWidth="3" fill="none" opacity="0.3"/>
        <path d="M200 0 Q220 80 260 120 Q300 160 340 200 Q370 230 390 280" stroke="#5c3a1e" strokeWidth="2.5" fill="none" opacity="0.25"/>
        <path d="M200 0 Q195 50 170 80 Q140 120 160 180 Q170 220 140 280" stroke="#5c3a1e" strokeWidth="2" fill="none" opacity="0.2"/>
        <path d="M200 0 Q210 60 240 90 Q270 120 250 180 Q240 220 270 280" stroke="#5c3a1e" strokeWidth="2" fill="none" opacity="0.2"/>
      </svg>

      <div style={{ ...styles.content, opacity: 1, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
        <div style={styles.header}>
          <div style={styles.seedIcon}>🌱</div>
          <div>
            <h1 style={styles.title}>My Projects</h1>
            <p style={styles.subtitle}>Select a project to view its sprint page.</p>
          </div>
        </div>

        {error && <p style={styles.errorMsg}>{error}</p>}

        {loading ? (
          <p style={{ color: "#c9a87a", fontStyle: "italic" }}>Loading projects...</p>
        ) : (
          <div style={styles.cardGrid}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={i * 120}
                onClick={() => navigate(`/projects/${project.id}`)}
                onDelete={(e) => handleDelete(e, project.id)}
              />
            ))}

            <div style={styles.addCard} onClick={() => setShowModal(true)}>
              <span style={styles.addIcon}>+</span>
              <span style={styles.addText}>New Project</span>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>🌿 New Project</h2>
            <p style={styles.modalSubtitle}>Give your project a name to get started.</p>
            <input
              style={styles.input}
              placeholder="Project name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              autoFocus
            />
            <div style={styles.modalBtns}>
              <button style={styles.cancelBtn} onClick={() => { setShowModal(false); setNewName(""); }}>
                Cancel
              </button>
              <button style={styles.saveBtn} onClick={handleCreate}>
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, delay, onClick, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), delay + 100);
  }, [delay]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(24px)",
        transition: "all 0.4s ease",
        boxShadow: hovered
          ? "0 12px 40px rgba(60,30,10,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
          : "0 4px 16px rgba(60,30,10,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <div style={styles.cardTop} />
      <div style={styles.cardBody}>
        <div style={styles.cardTitleRow}>
          <h2 style={styles.cardTitle}>{project.name}</h2>
          <button onClick={onDelete} style={styles.deleteBtn} title="Delete project">✕</button>
        </div>
        <div style={styles.cardFooter}>
          <span style={styles.openText}>Open board →</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", position: "relative", overflow: "hidden",
    fontFamily: "'Georgia', 'Times New Roman', serif", backgroundColor: "#1a0e07",
  },
  sky: {
    position: "absolute", top: 0, left: 0, right: 0, height: "35%",
    background: "linear-gradient(180deg, #b8d4e8 0%, #d4e8c2 100%)",
  },
  ground: {
    position: "absolute", top: "35%", left: 0, right: 0, bottom: 0,
    background: "linear-gradient(180deg, #5c3a1e 0%, #3d2010 40%, #2a1508 100%)",
  },
  soilLayer1: {
    position: "absolute", top: "33%", left: 0, right: 0, height: "6px",
    background: "linear-gradient(90deg, #7a4f2a, #6b4020, #7a4f2a, #5c3510)", opacity: 0.8,
  },
  soilLayer2: {
    position: "absolute", top: "36%", left: 0, right: 0, height: "3px",
    background: "#4a2c12", opacity: 0.5,
  },
  rootsSvg: {
    position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)",
    width: "100%", maxWidth: "400px", height: "300px", pointerEvents: "none",
  },
  content: {
    position: "relative", zIndex: 10, maxWidth: "860px",
    margin: "0 auto", padding: "48px 24px 80px",
  },
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" },
  seedIcon: { fontSize: "48px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" },
  title: {
    margin: 0, fontSize: "36px", fontWeight: "700", color: "#f5e6c8",
    textShadow: "0 2px 8px rgba(0,0,0,0.4)", letterSpacing: "-0.5px",
  },
  subtitle: { margin: "4px 0 0", fontSize: "15px", color: "#c9a87a", fontStyle: "italic" },
  errorMsg: { color: "#e85d3a", fontSize: "14px", marginBottom: "16px" },
  cardGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px",
  },
  card: {
    borderRadius: "12px", overflow: "hidden", cursor: "pointer",
    background: "rgba(245, 230, 200, 0.92)", border: "1px solid rgba(180, 130, 70, 0.4)",
  },
  cardTop: { height: "8px", background: "linear-gradient(90deg, #8b5e3c, #a0722a, #7a4f2a, #6b4020)" },
  cardBody: { padding: "20px" },
  cardTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
  cardTitle: { margin: 0, fontSize: "18px", fontWeight: "700", color: "#3d2010", lineHeight: 1.3 },
  deleteBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#a06040", fontSize: "14px", padding: "0 0 0 8px", lineHeight: 1,
  },
  cardFooter: { borderTop: "1px solid rgba(92, 58, 30, 0.15)", paddingTop: "12px" },
  openText: { fontSize: "13px", color: "#8b5e3c", fontWeight: "600", letterSpacing: "0.3px" },
  addCard: {
    borderRadius: "12px", border: "2px dashed rgba(200, 160, 100, 0.4)",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: "8px", minHeight: "140px",
    cursor: "pointer", color: "#c9a87a", transition: "all 0.2s ease",
  },
  addIcon: { fontSize: "28px", lineHeight: 1 },
  addText: { fontSize: "14px", fontWeight: "600", letterSpacing: "0.5px" },
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(20,10,4,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
  },
  modal: {
    background: "#f5e6c8", borderRadius: "16px", padding: "32px",
    width: "100%", maxWidth: "380px", display: "flex", flexDirection: "column", gap: "12px",
  },
  modalTitle: { margin: 0, fontSize: "22px", color: "#3d2010" },
  modalSubtitle: { margin: 0, fontSize: "14px", color: "#7a4f2a", fontStyle: "italic" },
  input: {
    padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(92,58,30,0.3)",
    background: "rgba(255,255,255,0.6)", fontSize: "15px",
    fontFamily: "inherit", color: "#3d2010", outline: "none",
  },
  modalBtns: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" },
  cancelBtn: {
    padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(92,58,30,0.3)",
    background: "transparent", cursor: "pointer", fontSize: "14px",
    fontFamily: "inherit", color: "#5c3a1e",
  },
  saveBtn: {
    padding: "8px 20px", borderRadius: "8px", border: "none",
    background: "#8b5e3c", cursor: "pointer", fontSize: "14px",
    fontFamily: "inherit", color: "#f5e6c8", fontWeight: "700",
  },
};
