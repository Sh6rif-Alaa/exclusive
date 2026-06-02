import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode)
      document.documentElement.classList.add("dark");
    else
      document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="relative">
      <button onClick={() => setDarkMode(!darkMode)} id="theme-toggle" className="cursor-pointer hover:text-primary transition-colors mt-1">
        {darkMode ? (
          <Sun size={20} color="#ffffff" />
        ) : (
          <Moon size={20} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
