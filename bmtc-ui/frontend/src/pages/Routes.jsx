import { useState, useEffect } from "react";
import api from "../services/api";

export default function Routes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    api.get("/routes").then(res => setRoutes(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Routes</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Distance</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {routes.map(r => (
            <tr key={r.route_id} className="border">
              <td className="p-2">{r.route_id}</td>
              <td>{r.start_point}</td>
              <td>{r.end_point}</td>
              <td>{r.total_distance} km</td>
              <td>{r.average_duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
