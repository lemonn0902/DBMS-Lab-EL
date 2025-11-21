import { useState } from "react";
import api from "../services/api";

export default function AddComplaint() {
  const [form, setForm] = useState({
    complaint_id: "",
    complaint_date: "",
    status: "Pending",
    bus_id: "",
    driver_id: "",
    complaint_details: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/complaints", form);
    alert("Complaint submitted!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Submit Complaint</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        {Object.keys(form).map(key => (
          <input
            key={key}
            name={key}
            className="border p-2 w-full"
            value={form[key]}
            placeholder={key}
            onChange={handleChange}
          />
        ))}

        <button className="bg-red-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
