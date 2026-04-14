import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sprint from "./components/Sprint";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Sprint Board */}
        <Route path="/sprint" element={<Sprint />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;