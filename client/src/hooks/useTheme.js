import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;
    document.documentElement.className = resolved;
  }, [theme]);

  return [theme, setThemeState];
};
