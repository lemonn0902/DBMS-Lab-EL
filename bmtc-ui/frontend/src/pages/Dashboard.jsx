import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">BMTC Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <Link className="p-4 bg-blue-200 rounded" to="/drivers">Drivers</Link>
        <Link className="p-4 bg-green-200 rounded" to="/buses">Buses</Link>
        <Link className="p-4 bg-purple-200 rounded" to="/routes">Routes</Link>
        <Link className="p-4 bg-yellow-200 rounded" to="/shifts">Shifts</Link>
        <Link className="p-4 bg-red-200 rounded" to="/complaints">Complaints</Link>
        <Link className="p-4 bg-orange-200 rounded" to="/accidents">Accidents</Link>
      </div>
    </div>
  );
}
