
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Apply theme on initial load
const theme = localStorage.getItem("theme") || "light";
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (theme === "dark" || (theme === "system" && systemPrefersDark)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.add("light");
}

createRoot(document.getElementById("root")!).render(<App />);
