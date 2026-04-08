import { useEffect, useState } from "react";
import { getProjects } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading projects...</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li
              key={project.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}