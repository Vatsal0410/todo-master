import { useMemo } from "react";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home";
import { Moon, Sun } from "lucide-react";

function App() {
  const { toggleTheme, theme } = useTheme();

  const ThemeIcon = useMemo(() => (theme === "dark" ? Sun : Moon), [theme]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle theme"
      >
        <ThemeIcon className={`w-5 h-5 ${theme === "dark" ? "text-amber-500" : "text-indigo-600"}`} />
      </button>
      <Home />
    </div>
  );
}

export default App;
