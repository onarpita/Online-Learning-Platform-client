import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      <svg
        className="swap-on fill-current w-7 h-7 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64 17.657l-1.414 1.414L6.05 20.89l1.414-1.414L5.64 17.657zm12.728 0l-1.414 1.414L18.778 20.89l1.414-1.414-1.824-1.819zM12 4.354V2h-1v2.354a7.96 7.96 0 00-6.95 6.95H2v1h2.354a7.96 7.96 0 006.95 6.95V22h1v-2.354a7.96 7.96 0 006.95-6.95H22v-1h-2.354a7.96 7.96 0 00-6.95-6.95zM12 17a5 5 0 110-10 5 5 0 010 10z" />
      </svg>

      <svg
        className="swap-off fill-current w-7 h-7 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64 13.65a9 9 0 01-11.31-11.31A9 9 0 1021.64 13.65z" />
      </svg>
    </label>
  );
}