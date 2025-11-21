import { useEffect, useState } from "react";
import api from "../services/api";

export default function Accidents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/accidents").then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Accident Reports</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Bus</th>
            <th>Route</th>
            <th>Date</th>
            <th>Location</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {items.map(a => (
            <tr key={a.accident_id} className="border">
              <td className="p-2">{a.accident_id}</td>
              <td>{a.Driver?.name}</td>
              <td>{a.Bus?.registration_no}</td>
              <td>{a.Route?.start_point} → {a.Route?.end_point}</td>
              <td>{a.accident_date}</td>
              <td>{a.location}</td>
              <td>{a.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
