import { useState } from "react";
import axios from "axios";

export default function FarmerServiceForm({ refresh }) {
  const [form, setForm] = useState({ name: "", price: 0, description: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/products", form, { headers: { Authorization: `Bearer ${localStorage.token}` } });
    alert("Product Added");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 space-y-2">
      <input className="p-2 border w-full" placeholder="Product Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="number" className="p-2 border w-full" placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <textarea className="p-2 border w-full" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <button className="bg-indigo-600 text-white px-4 py-2">Add Product</button>
    </form>
  );
}
