import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [services, setServices] = useState("");
  const [theme, setTheme] = useState("system"); // light, dark, system
  const [username, setUsername] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    // Optional: Fetch and populate existing settings from DB on mount
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const data = res.data;
        setAbout(data.about || "");
        setContact(data.contact || "");
        setServices((data.services || []).join(","));
        setTheme(data.theme || "system");
        setUsername(data.username || "");
        setEmailNotifications(data.emailNotifications ?? true);
        setIsPrivate(data.isPrivate ?? false);
      })
      .catch(err => console.error("Settings fetch failed", err));
  }, []);

  const save = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/settings`,
      {
        username,
        about,
        contact,
        services: services.split(",").map(s => s.trim()),
        theme,
        emailNotifications,
        isPrivate,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Settings saved!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-2">⚙️ Settings</h2>

      <div className="space-y-2">
        <label className="block font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">About Me</label>
        <textarea
          value={about}
          onChange={e => setAbout(e.target.value)}
          className="border p-2 w-full rounded"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Contact Info</label>
        <input
          type="text"
          value={contact}
          onChange={e => setContact(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Services (comma separated)</label>
        <input
          type="text"
          value={services}
          onChange={e => setServices(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Appearance</label>
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="system">System Default</option>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(prev => !prev)}
          id="emailNotifications"
        />
        <label htmlFor="emailNotifications" className="font-medium">
          Receive email notifications
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(prev => !prev)}
          id="privateMode"
        />
        <label htmlFor="privateMode" className="font-medium">
          Make my profile private
        </label>
      </div>

      <button
        onClick={save}
        className="bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
}
