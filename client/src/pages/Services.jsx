import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerServiceForm from "../components/FarmerServiceForm";

const Services = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role")?.toLowerCase() || "customer");
  const token = localStorage.getItem("token");

  const fetchProducts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      {role === "farmer" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add Your Products</h2>
          <FarmerServiceForm onProductChange={fetchProducts} />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border rounded p-4 bg-white shadow">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-green-700 font-semibold">${product.price}</p>
            {product.photo && <img src={product.photo} alt={product.name} className="w-full h-32 object-cover mt-2" />}
            {role === "farmer" && product.farmer && product.farmer._id === localStorage.getItem("userId") && (
              <div className="flex gap-2 mt-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => {
                  setEditId(product._id);
                  setEditName(product.name);
                  setEditDescription(product.description);
                  setEditPrice(product.price);
                  setEditPhoto(product.photo || "");
                }}>Edit</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={async () => {
                  await axios.delete(`${import.meta.env.VITE_API_URL}/products/${product._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  fetchProducts();
                }}>Delete</button>
              </div>
            )}
            {editId === product._id && (
              <form className="mt-2 space-y-2" onSubmit={async (e) => {
                e.preventDefault();
                await axios.put(`${import.meta.env.VITE_API_URL}/products/${editId}`, {
                  name: editName,
                  description: editDescription,
                  price: editPrice,
                  photo: editPhoto
                }, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                setEditId(null);
                fetchProducts();
              }}>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="input input-bordered w-full" placeholder="Product Name" />
                <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="input input-bordered w-full" placeholder="Description" />
                <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="input input-bordered w-full" placeholder="Price" />
                <input type="text" value={editPhoto} onChange={e => setEditPhoto(e.target.value)} className="input input-bordered w-full" placeholder="Photo URL (optional)" />
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </form>
            )}
            {role === "customer" && (
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded" onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                alert("Added to cart!");
              }}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
