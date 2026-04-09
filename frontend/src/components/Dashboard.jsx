import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  { id: 1, name: "Task Manager", sprints: 3, tasks: 12 },
  { id: 2, name: "Final Project", sprints: 2, tasks: 8 },
  { id: 3, name: "Agile Sprint Board", sprints: 4, tasks: 20 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div style={styles.page}>
      {/* Soil texture layers */}
      <div style={styles.sky} />
      <div style={styles.ground} />
      <div style={styles.soilLayer1} />
      <div style={styles.soilLayer2} />

      {/* Decorative roots */}
      <svg style={styles.rootsSvg} viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M200 0 Q180 60 150 100 Q120 140 80 180 Q50 210 20 280" stroke="#5c3a1e" strokeWidth="3" fill="none" opacity="0.3"/>
        <path d="M200 0 Q220 80 260 120 Q300 160 340 200 Q370 230 390 280" stroke="#5c3a1e" strokeWidth="2.5" fill="none" opacity="0.25"/>
        <path d="M200 0 Q195 50 170 80 Q140 120 160 180 Q170 220 140 280" stroke="#5c3a1e" strokeWidth="2" fill="none" opacity="0.2"/>
        <path d="M200 0 Q210 60 240 90 Q270 120 250 180 Q240 220 270 280" stroke="#5c3a1e" strokeWidth="2" fill="none" opacity="0.2"/>
      </svg>

      <div style={{ ...styles.content, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.seedIcon}>🌱</div>
          <div>
            <h1 style={styles.title}>My Projects</h1>
            <p style={styles.subtitle}>Select a project to view its sprint board</p>
          </div>
        </div>

        {/* Project cards */}
        <div style={styles.cardGrid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i * 120}
              onClick={() => navigate(`/projects/${project.id}`)}
            />
          ))}

          {/* Add project card */}
          <div style={styles.addCard}>
            <span style={styles.addIcon}>+</span>
            <span style={styles.addText}>New Project</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, delay, onClick }) {
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
      {/* Card dirt texture strip */}
      <div style={styles.cardTop} />

      <div style={styles.cardBody}>
        <h2 style={styles.cardTitle}>{project.name}</h2>
        <div style={styles.cardMeta}>
          <span style={styles.metaPill}>🌀 {project.sprints} sprints</span>
          <span style={styles.metaPill}>📋 {project.tasks} tasks</span>
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
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    backgroundColor: "#1a0e07",
  },
  sky: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "35%",
    background: "linear-gradient(180deg, #b8d4e8 0%, #d4e8c2 100%)",
  },
  ground: {
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(180deg, #5c3a1e 0%, #3d2010 40%, #2a1508 100%)",
  },
  soilLayer1: {
    position: "absolute",
    top: "33%",
    left: 0,
    right: 0,
    height: "6px",
    background: "linear-gradient(90deg, #7a4f2a, #6b4020, #7a4f2a, #5c3510)",
    opacity: 0.8,
  },
  soilLayer2: {
    position: "absolute",
    top: "36%",
    left: 0,
    right: 0,
    height: "3px",
    background: "#4a2c12",
    opacity: 0.5,
  },
  rootsSvg: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "400px",
    height: "300px",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 10,
    maxWidth: "860px",
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "40px",
  },
  seedIcon: {
    fontSize: "48px",
    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
  },
  title: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "700",
    color: "#f5e6c8",
    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "15px",
    color: "#c9a87a",
    fontStyle: "italic",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    background: "rgba(245, 230, 200, 0.92)",
    border: "1px solid rgba(180, 130, 70, 0.4)",
  },
  cardTop: {
    height: "8px",
    background: "linear-gradient(90deg, #8b5e3c, #a0722a, #7a4f2a, #6b4020)",
  },
  cardBody: {
    padding: "20px",
  },
  cardTitle: {
    margin: "0 0 12px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#3d2010",
    lineHeight: 1.3,
  },
  cardMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  metaPill: {
    fontSize: "12px",
    padding: "3px 10px",
    borderRadius: "20px",
    background: "rgba(92, 58, 30, 0.12)",
    color: "#5c3a1e",
    border: "1px solid rgba(92, 58, 30, 0.2)",
  },
  cardFooter: {
    borderTop: "1px solid rgba(92, 58, 30, 0.15)",
    paddingTop: "12px",
  },
  openText: {
    fontSize: "13px",
    color: "#8b5e3c",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  addCard: {
    borderRadius: "12px",
    border: "2px dashed rgba(200, 160, 100, 0.4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "140px",
    cursor: "pointer",
    color: "#c9a87a",
    transition: "all 0.2s ease",
  },
  addIcon: {
    fontSize: "28px",
    lineHeight: 1,
  },
  addText: {
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
};