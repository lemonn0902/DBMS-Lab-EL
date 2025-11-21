import { useEffect, useState } from "react";
import api from "../services/api";

export default function Shifts() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    api.get("/shifts").then(res => setShifts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shifts</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Shift ID</th>
            <th>Driver</th>
            <th>Conductor</th>
            <th>Bus</th>
            <th>Route</th>
            <th>Timing</th>
          </tr>
        </thead>

        <tbody>
          {shifts.map(s => (
            <tr key={s.shift_id} className="border">
              <td className="p-2">{s.shift_id}</td>
              <td>{s.Driver?.name}</td>
              <td>{s.Conductor?.name}</td>
              <td>{s.Bus?.registration_no}</td>
              <td>{s.Route?.start_point} → {s.Route?.end_point}</td>
              <td>{s.start_time} - {s.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
