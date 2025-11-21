import { useEffect, useState } from "react";
import api from "../services/api";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await api.get("/drivers");
        setDrivers(res.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        alert(`Error loading drivers: ${error.response?.data?.error || error.message || "Failed to fetch drivers"}`);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Drivers</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>License</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d.driver_id} className="border">
              <td className="p-2">{d.driver_id}</td>
              <td>{d.name}</td>
              <td>{d.license_no}</td>
              <td>{d.contact_no}</td>
              <td>{d.current_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
