import React from "react";

const Account = () => {
  // Mock user data
  const mockUser = {
    name: "Brad Mwangi",
    email: "bradmwangi@greenfieldfarms.co.ke",
    role: "Farmer",
    phone: "+254 712 345 678",
    joined: "March 14, 2024",
    location: "Nakuru, Kenya",
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
        <p><strong>Name:</strong> {mockUser.name}</p>
        <p><strong>Email:</strong> {mockUser.email}</p>
        <p><strong>Role:</strong> {mockUser.role}</p>
        <p><strong>Phone:</strong> {mockUser.phone}</p>
        <p><strong>Location:</strong> {mockUser.location}</p>
        <p><strong>Joined:</strong> {mockUser.joined}</p>
      </div>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
        Delete Account
      </button>
    </div>
  );
};

export default Account;
