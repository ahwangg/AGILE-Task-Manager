import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sprint from "./components/Sprint";
import TaskPage from "./components/Task";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Sprint Board */}
        <Route path="/projects/:id" element={<Sprint />} />

        {/* Task Page */}
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;