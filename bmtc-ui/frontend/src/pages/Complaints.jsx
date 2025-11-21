import { useEffect, useState } from "react";
import api from "../services/api";

export default function Complaints() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/complaints").then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Complaints</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Bus</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {items.map(c => (
            <tr key={c.complaint_id} className="border">
              <td className="p-2">{c.complaint_id}</td>
              <td>{c.Driver?.name}</td>
              <td>{c.Bus?.registration_no}</td>
              <td>{c.status}</td>
              <td>{c.complaint_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
