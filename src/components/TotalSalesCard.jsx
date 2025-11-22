import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const data = [
  { name: "Direct", value: 300.56, light: "#000000", dark: "#FFFFFF" },
  { name: "Affiliate", value: 135.18, light: "#C6F6D5", dark: "#6EE7B7" },
  { name: "Sponsored", value: 154.02, light: "#8FA4FF", dark: "#A5B4FC" },
  { name: "E-mail", value: 48.96, light: "#AEE6FF", dark: "#7DD3FC" },
];

const TOTAL = data.reduce((sum, d) => sum + d.value, 0);

const CustomTooltip = ({ active, payload, theme }) => {
  if (active && payload && payload.length) {
    const percent = ((payload[0].value / TOTAL) * 100).toFixed(1);
    return (
      <div
        className="px-2 py-1 rounded text-xs shadow"
        style={{
          background: theme === "dark" ? "#1A1A1A" : "#000000",
          color: "#FFFFFF",
        }}
      >
        {percent}%
      </div>
    );
  }
  return null;
};

export default function TotalSalesCard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      className="rounded-2xl p-6 shadow-sm"
      style={{
        background: isDark ? "#FFFFFF0D" : "#F7F9FB",
        color: isDark ? "#E5E5E5" : "#1C1C1C",
      }}
    >
      <Typography
        className="font-semibold text-sm"
        sx={{ color: isDark ? "#FFFFFF" : "#1C1C1C" }}
      >
        Total Sales
      </Typography>

      <Box className="flex flex-col justify-center items-center gap-6 mt-4">
        {/* PIE CHART */}
        <Box className="w-[140px] h-[140px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                cornerRadius={50}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={isDark ? entry.dark : entry.light} />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip theme={theme} />} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* LEGEND */}
        <Box
          className="text-sm space-y-3"
          style={{ color: isDark ? "#E5E5E5" : "#1C1C1C" }}
        >
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: isDark ? entry.dark : entry.light,
                }}
              ></span>
              <span>{entry.name}</span>
              <span className="ml-auto font-medium">
                ${entry.value.toFixed(2)}
              </span>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
