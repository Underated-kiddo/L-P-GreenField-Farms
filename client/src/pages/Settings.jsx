import { useState, useEffect } from "react";
import axios from "axios";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme"; // adjust path if needed

export default function Settings() {
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [services, setServices] = useState("");
  const [username, setUsername] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useTheme(); // 👈 Now using shared global hook

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setAbout(data.about || "");
        setContact(data.contact || "");
        setServices((data.services || []).join(","));
        setTheme(data.theme || "system"); // 👈 Apply saved theme globally
        setUsername(data.username || "");
        setEmailNotifications(data.emailNotifications ?? true);
        setIsPrivate(data.isPrivate ?? false);
        setAvatarPreview(data.avatar || null);
      })
      .catch((err) => console.error("Settings fetch failed", err));
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async () => {
    if (!avatar) return null;

    const formData = new FormData();
    formData.append("avatar", avatar);

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/upload-avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.url;
  };

  const save = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const avatarUrl = await uploadAvatar();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/settings`,
        {
          username,
          about,
          contact,
          services: services.split(",").map((s) => s.trim()),
          theme,
          emailNotifications,
          isPrivate,
          avatar: avatarUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Settings saved!");
    } catch (err) {
      alert("Failed to save settings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword)
      return alert("New passwords do not match.");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Password updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert("Password change failed.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-2">⚙️ Settings</h2>

      {/* Avatar Upload */}
      <div className="flex items-center gap-4">
        <img
          src={avatarPreview || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <label className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-200 text-sm font-medium">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">About Me</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="border p-2 w-full rounded"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Contact Info</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Services (comma separated)</label>
        <input
          type="text"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Theme Mode Toggle */}
      <div className="space-y-2">
        <label className="block font-medium mb-1">Appearance</label>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-full ${theme === "light" ? "bg-yellow-200 dark:bg-yellow-600" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            <Sun size={20} />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-full ${theme === "dark" ? "bg-blue-300 dark:bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            <Moon size={20} />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`px-3 py-2 rounded text-sm font-medium border ${theme === "system" ? "bg-gray-300 dark:bg-gray-700" : ""}`}
          >
            System Default
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications((prev) => !prev)}
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
          onChange={() => setIsPrivate((prev) => !prev)}
          id="privateMode"
        />
        <label htmlFor="privateMode" className="font-medium">
          Make my profile private
        </label>
      </div>

      {/* Password Change */}
      <div className="space-y-2 pt-4">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={changePassword}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Update Password
        </button>
      </div>

      <button
        onClick={save}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-green-700"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
