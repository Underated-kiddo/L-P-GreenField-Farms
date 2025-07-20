import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const handlePay = () => {
    alert("Simulated payment via M-Pesa/VISA complete.");
    localStorage.removeItem("cart");
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-3 shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p>Qty: {item.qty}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))
      )}
      <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
    </div>
  );
}
