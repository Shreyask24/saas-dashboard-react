import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import RightRail from "./components/RightRail";
import OrderList from "./pages/OrderList";
import { Box } from "@mui/material";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightRailCollapsed, setRightRailCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const { theme } = useTheme();

  return (
    <div
      className={`
        min-h-screen flex
        ${
          theme === "dark"
            ? "bg-[#0F0F0F] text-white"
            : "bg-zinc-50 text-zinc-900"
        }
      `}
    >
      {/* SIDEBAR */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setActivePage={setActivePage}
        setRightRailCollapsed={setRightRailCollapsed}
      />

      {/* MAIN CONTENT */}
      <Box component="main" className="flex-1 flex flex-col">
        {activePage === "dashboard" && (
          <Dashboard
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            setRightRailCollapsed={setRightRailCollapsed}
          />
        )}

        {activePage === "orders" && (
          <OrderList
            setSidebarCollapsed={setSidebarCollapsed}
            setRightRailCollapsed={setRightRailCollapsed}
          />
        )}
      </Box>

      {/* RIGHT RAIL */}
      {!rightRailCollapsed && <RightRail />}
    </div>
  );
}
