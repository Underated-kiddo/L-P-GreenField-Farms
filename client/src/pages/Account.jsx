import React from "react";

const Account = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p><strong>Name:</strong> {localStorage.getItem("name") || "User"}</p>
        <p><strong>Email:</strong> user@example.com</p>
        <p><strong>Role:</strong> {localStorage.getItem("role") || "Customer"}</p>
      </div>
      <button className="bg-red-600 text-white px-4 py-2 rounded">Delete Account</button>
    </div>
  );
};

export default Account;
