import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button onClick={toggleTheme} id="theme-toggle" className="cursor-pointer hover:text-primary transition-colors mt-1">
        {theme === "dark" ? (
          <Sun size={20} color="#ffffff" />
        ) : (
          <Moon size={20} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
