import { useState } from "react";
import { Box, Typography } from "@mui/material";

import StatCard from "../components/dashboard/StatCard";

import { stats } from "../utils/dashboardData";
import RevenueChart from "../components/dashboard/RevenueChart";
import ProjectionChart from "../components/ProjectionChart";
import RevenueLocationChart from "../components/RevenueLocationChart";
import SalesChart from "../components/SalesChart";

import PageHeader from "../components/layout/PageHeader";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard({
  setSidebarCollapsed,
  setRightRailCollapsed,
}) {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box component="main" className="flex-1">
      <PageHeader
        title="Default"
        breadcrumb="Dashboards"
        setSidebarCollapsed={setSidebarCollapsed}
        setRightRailCollapsed={setRightRailCollapsed}
      />

      <Box className="grid grid-cols-12 gap-6 p-6">
        <Typography color="inherit" className="text-sm black font-semibold">
          eCommerce
        </Typography>

        <Box
          component="section"
          className="col-span-12 lg:col-span-12 space-y-6"
        >
          <Box className="md:flex justify-between xs:flex-col">
            <Box className="grid grid-cols-2 xl:grid-cols-2 gap-10">
              {stats.map((s) => (
                <StatCard key={s.id} {...s} />
              ))}
            </Box>

            <ProjectionChart />
          </Box>

          {/* ---------- REVENUE + LOCATION ---------- */}
          <Box className="grid grid-cols-12 gap-6">
            <Box
              className="col-span-12 xl:col-span-8 rounded-lg shadow-sm p-4"
              style={{
                background: isDark ? "#FFFFFF0D" : "#F7F9FB",
                color: isDark ? "#FFFFFF0D" : "#1C1C1C",
              }}
            >
              <RevenueChart
                currentWeek={[14, 11, 9, 12, 17, 19]}
                previousWeek={[10, 18, 14, 10, 13, 22]}
              />
            </Box>

            <RevenueLocationChart />
          </Box>

          <SalesChart search={search} />
        </Box>
      </Box>
    </Box>
  );
}
