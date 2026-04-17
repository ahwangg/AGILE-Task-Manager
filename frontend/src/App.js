import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sprint from "./components/Sprint";
import Task from "./components/Task";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Sprint Board */}
        <Route path="/sprint" element={<Sprint />} />

        {/* Task Page */}
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;