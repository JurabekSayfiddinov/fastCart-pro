import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../Context/Theme";


export default function Layout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`
        min-h-screen flex flex-col
        transition-colors duration-300
        ${
          darkMode
            ? "bg-[#0B1120] text-white"
            : "bg-white text-black"
        }
      `}
    >
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}