import { useState } from "react";
import api from "../services/api";

export default function AddDriver() {
  const [form, setForm] = useState({
    driver_id: "",
    name: "",
    license_no: "",
    join_date: "",
    experience_years: "",
    contact_no: "",
    current_status: "Active"
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post("/drivers", form);
      alert("Driver added successfully!");
      // Reset form
      setForm({
        driver_id: "",
        name: "",
        license_no: "",
        join_date: "",
        experience_years: "",
        contact_no: "",
        current_status: "Active"
      });
    } catch (error) {
      console.error("Error adding driver:", error);
      alert(`Error: ${error.response?.data?.error || error.message || "Failed to add driver"}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Add New Driver</h2>

      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        {Object.keys(form).map(key => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            className="block border p-2 w-full"
            onChange={handleChange}
          />
        ))}

        <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
