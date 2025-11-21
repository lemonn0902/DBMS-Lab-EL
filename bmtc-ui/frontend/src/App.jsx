import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Drivers from "./pages/Drivers.jsx";
import AddDriver from "./pages/AddDriver.jsx";
import Buses from "./pages/Buses.jsx";
import RoutesPage from "./pages/Routes.jsx";
import Shifts from "./pages/Shifts.jsx";
import Complaints from "./pages/Complaints.jsx";
import AddComplaint from "./pages/AddComplaint.jsx";
import Accidents from "./pages/Accidents.jsx";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-blue-700 text-white p-4 flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/add-driver">Add Driver</Link>
        <Link to="/buses">Buses</Link>
        <Link to="/routes">Routes</Link>
        <Link to="/shifts">Shifts</Link>
        <Link to="/complaints">Complaints</Link>
        <Link to="/add-complaint">Add Complaint</Link>
        <Link to="/accidents">Accidents</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/add-driver" element={<AddDriver />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/add-complaint" element={<AddComplaint />} />
          <Route path="/accidents" element={<Accidents />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
