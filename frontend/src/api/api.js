export async function getProjects() {
  const res = await fetch("http://localhost:8000/projects");
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}