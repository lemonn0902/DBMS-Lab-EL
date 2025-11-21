import { useState, useEffect } from "react";
import api from "../services/api";

export default function Buses() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    api.get("/buses").then(res => setBuses(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Buses</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th>Depot</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Registration</th>
          </tr>
        </thead>

        <tbody>
          {buses.map(bus => (
            <tr key={bus.bus_id} className="border">
              <td className="p-2">{bus.bus_id}</td>
              <td>{bus.depot_name}</td>
              <td>{bus.capacity}</td>
              <td>{bus.type}</td>
              <td>{bus.registration_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
